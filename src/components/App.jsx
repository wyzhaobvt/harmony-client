import { createContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import CallRequestAlert from "./CallRequestAlert";
import Navbar from "./Navbar";
import setTheme from "../utils/setTheme";
import { peer, socket, AppContext } from "../utils/globals";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [callAlert, setCallAlert] = useState(null);
  const [teamNotifications, setTeamNotifications] = useState({});
  const [teamUpdated, setTeamUpdated] = useState({})
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
        const val = obj[uid]
        obj[uid] = val === null ? -1 : val > 0 ? null : val - 1
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
      setTeamUpdated(prev=>{
        const obj = {[team]: (prev[team] || 0) + 1}
        return obj
      })
    }
    
    function onEditedMessage({team}) {
      setTeamUpdated(prev=>{
        const obj = {[team]: (prev[team] || 0) + 1}
        return obj
      })
    }

    function onDeletedMessage({team}) {
      setTeamUpdated(prev=>{
        const obj = {[team]: (prev[team] || 0) + 1}
        return obj
      })
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
    socket.on("update:edited_message", onEditedMessage)
    socket.on("update:deleted_message", onDeletedMessage)
    
    return () => {
      peer.removeEventListener("callInvite", onCallInvite);
      peer.removeEventListener("receivingChanged", onReceivingChanged);
      socket.off("update:new_message", onNewMessage);
      socket.off("update:edited_message", onEditedMessage)
      socket.off("update:deleted_message", onDeletedMessage)
    };
  }, []);
  return (
    <AppContext.Provider value={{ teamNotifications, setTeamNotifications, teamUpdated }}>
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
