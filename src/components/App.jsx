import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import CallRequestAlert from "./CallRequestAlert";
import Navbar from "./Navbar";
import setTheme from "../utils/setTheme";
import { peer, socket } from "../utils/globals";
import { useToast } from "@/components/ui/use-toast"

function App() {
  const [callAlert, setCallAlert] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const { toast } = useToast()
  socket.on("update:test",(message)=>{
    toast({
      description: "Message: " + message
    })
  })
  setTheme();
  useEffect(() => {
    peer.addEventListener(
      "callInvite",
      ({ socketId, username }, accept, decline) => {
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
    );
    peer.addEventListener("receivingChanged", () => {
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
    });
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        {callAlert}
      </main>
      <audio ref={audioRef} autoPlay playsInline></audio>
    </>
  );
}
export default App;
