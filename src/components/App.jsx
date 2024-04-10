import { createContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import CallRequestAlert from "./CallRequestAlert";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import setTheme from "../utils/setTheme";
import { peer, socket } from "../utils/globals";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import setTheme from "../utils/setTheme";
import { peer, socket, AppContext } from "../utils/globals";
import { useToast } from "@/components/ui/use-toast";

function App() {
  const [callAlert, setCallAlert] = useState(null);
  const [teamNotifications, setTeamNotifications] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);
  const { toast } = useToast();

  setTheme();

  useEffect(() => {
    const [, group, , uid] = location.pathname.split("/");
    if (group === "group" && teamNotifications[uid]) {
      setTeamNotifications(prev=>{
        const obj = {...prev}
        obj[uid] = null
        return obj
      })
    }
  }, [location]);

  useEffect(() => {
    function onNewMessage({ team }) {
      setTeamNotifications((prev) => {
        const obj = { ...prev };
        obj[team] ??= 0;
        obj[team]++;
        return obj;
      });
    }

    function onCallInvite({ socketId, username }, accept, decline) {
      setCallAlert(
        <CallRequestAlert
          from={username}
          acceptFunction={() => {
            accept();
            navigate("video");
            setCallAlert(null);
          }}
          declineFunction={() => {
            decline();
            setCallAlert(null);
          }}
        ></CallRequestAlert>
      );
    }

    function onReceivingChanged() {
      const audio = new MediaStream();
      for (const socketId in peer.streams) {
        const streams = peer.streams[socketId];
        if ("microphone" in streams) {
          streams["microphone"].getAudioTracks().forEach((track) => {
            audio.addTrack(track);
          });
        }
      }

      if (audioRef.current) {
        audioRef.current.srcObject = audio;
      }
    }

    peer.addEventListener("callInvite", onCallInvite);
    peer.addEventListener("receivingChanged", onReceivingChanged);
    socket.on("update:new_message", onNewMessage);

    return () => {
      peer.removeEventListener("callInvite", onCallInvite);
      peer.removeEventListener("receivingChanged", onReceivingChanged);
      socket.off("update:new_message", onNewMessage);
    };
  }, []);
  return (
    <AppContext.Provider value={{ teamNotifications, setTeamNotifications }}>
      <Navbar />
      <main>
        <Outlet />
        {callAlert}
      </main>
      <Toaster />
      <audio ref={audioRef} autoPlay playsInline></audio>
    </AppContext.Provider>
  );
}
export default App;
