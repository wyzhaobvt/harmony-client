import React, { useEffect, useRef, useState } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import CameraIcon from "../components/icons/CameraIcon";
import MicrophoneIcon from "../components/icons/MicrophoneIcon";
import MicrophoneMuteIcon from "../components/icons/MicrophoneMuteIcon";
import { Button } from "@/components/ui/button";
import VideoSelector from "../components/VideoSelector";

function VideoStream({ stream, ...props }) {
  const video = useRef(null);
  useEffect(() => {
    video.current.srcObject = stream;
  }, [video]);
  return <video ref={video} {...props} autoPlay playsInline></video>;
}

export default function VideoChat() {
  const users = [
    { name: "user1", type: "normal", color: "#2A3F5A" },
    { name: "user2", type: "normal", color: "#7E584F" },
    { name: "user3", type: "normal", color: "#4C8F73" },
    { name: "user4", type: "normal", color: "#B58963" },
    { name: "user5", type: "normal", color: "#3264A8" },
    { name: "user6", type: "normal", color: "#A54E30" },
    { name: "user7", type: "normal", color: "#6D7FAB" },
    { name: "user8", type: "normal", color: "#9C4E87" },
    { name: "user9", type: "normal", color: "#5E9164" },
    { name: "user10", type: "normal", color: "#8F725C" },
    { name: "user11", type: "normal", color: "#3A587C" },
    { name: "user12", type: "normal", color: "#B1733D" },
    { name: "user13", type: "normal", color: "#5C8A9F" },
    { name: "user14", type: "normal", color: "#84605E" },
    { name: "user15", type: "normal", color: "#327B61" },
    { name: "user16", type: "normal", color: "#AA6952" },
    { name: "user17", type: "normal", color: "#486F89" },
    { name: "user18", type: "normal", color: "#9A583E" },
    { name: "user19", type: "normal", color: "#598572" },
    { name: "user20", type: "normal", color: "#935E82" },
    { name: "user21", type: "normal", color: "#4F7E6A" },
  ].slice(0, 8);
  const [muted, setMuted] = useState(true);
  const [spotlight, setSpotlight] = useState(null);
  const [streams, setStreams] = useState([]);
  const streamTiles = streams.map((stream,i)=>{
    const element = (
      <VideoStream
        key={"video_"+i}
        stream={stream}
        className="aspect-video w-56 rounded-lg"
        onClick={() => {
          setSpotlight((prev) => {
            return prev == element ? null : element;
          });
        }}
        muted
      />
    );
    return element
  })
  const userTiles = users.map(((user, i)=>{
    const element = (
      <div
        key={"user_"+i}
        className="aspect-video flex w-56 rounded-lg justify-center items-center"
        style={{ backgroundColor: user.color }}
        onClick={() => {
          setSpotlight((prev) => {
            return prev == element ? null : element;
          });
        }}
      >
        <div className="w-20 h-20 bg-white opacity-50 rounded-full flex items-center justify-center text-black text-2xl">
          {user.color.slice(1, 3).toUpperCase()}
        </div>
      </div>
    );
    return element
  }))

  function handleMuteClick() {
    setMuted((prev) => !prev);
  }

  function handleVideoStartClick() {}

  function handleOnStream(stream) {
    setStreams((prev) => [...prev, stream]);
  }

  return (
    <div className="w-full h-full flex-grow flex flex-col gap-5 mb-24">
      <div className="w-full flex flex-col items-center px-10 [&>*]:w-[clamp(200px,100%,calc(70vh*(16/9)-10rem))]">
        {spotlight}
      </div>
      <div className="flex flex-grow w-full px-5 items-center">
        <div className="flex flex-wrap justify-center gap-3">
          {[...streamTiles, ...userTiles]}
        </div>
      </div>
      <div className="bg-secondary-foreground dark:bg-secondary max-h-12 min-h-12 fixed w-full bottom-0 flex grow text-white justify-between items-center px-8">
        <div className="flex gap-4 sm:w-1/3">
          <Button
            variant="ghost"
            className="flex flex-col justify-between items-center py-0.5 px-3 font-thin dark:hover:bg-primary-foreground w-16"
            onClick={handleMuteClick}
          >
            {muted ? (
              <MicrophoneMuteIcon className="w-5 h-5" />
            ) : (
              <MicrophoneIcon className="w-5 h-5" />
            )}
            <div className="text-xs">{muted ? "Unmute" : "Mute"}</div>
          </Button>
          <VideoSelector
            onStream={handleOnStream}
            triggerButton={
              <Button
                variant="ghost"
                className="flex flex-col justify-between items-center py-0.5 px-3 font-thin dark:hover:bg-primary-foreground"
                onClick={handleVideoStartClick}
              >
                <CameraIcon className="w-5 h-5" />
                <div className="text-xs">Start Video</div>
              </Button>
            }
          />
        </div>
        <div className="flex w-1/3 justify-center">
          <Button
            variant="ghost"
            className="flex flex-col justify-between items-center py-0.5 px-3 font-thin dark:hover:bg-primary-foreground"
          >
            <ChatBubbleIcon className="w-5 h-5" />
            <div className="text-xs">Chat</div>
          </Button>
        </div>
        <div className="flex w-1/3 justify-end">
          <Button className="h-7 bg-primary-foreground text-primary hover:bg-zinc-300 dark:bg-primary dark:text-primary-foreground dark:hover:bg-zinc-300">
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
}
