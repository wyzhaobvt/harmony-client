import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import CameraIcon from "../components/icons/CameraIcon";
import MicrophoneIcon from "../components/icons/MicrophoneIcon";
import MicrophoneMuteIcon from "../components/icons/MicrophoneMuteIcon";
import { Button } from "@/components/ui/button";

export default function VideoChat() {
  const [muted, setMuted] = useState(true);
  const [tileWidth, setTileWidth] = useState(null)
  useEffect(()=>{
    calculate()
    // console.log("running")
    window.addEventListener("resize", ()=>{calculate()})
    function calculate() {
      const width = window.innerWidth - 40
      const full = Math.floor(width / 160)
      setTileWidth(Math.floor(((width - ((full- 1) * 5)))))
    }
  }, [])
  return (
    <div className="flex w-full flex-col flex-grow relative">
      <div className="video-call-tile-container flex grow justify-center items-center pb-10">
        <div className="video-call-tile flex justify-center items-center gap-3 flex-wrap w-full px-5" onResize={()=>console.log("resize")}>
          
          {Array(12)
            .fill()
            .map((_, i) => {
              return (
                <div
                  key={i}
                  className="aspect-video flex min-w-48 bg-red-300 rounded-lg"
                >
                  Child {i}
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-secondary-foreground dark:bg-secondary max-h-12 h-12 sticky bottom-0 flex grow text-white justify-between items-center px-8">
        <div className="flex gap-4 sm:w-1/3">
          <Button
            variant="ghost"
            className="flex flex-col justify-between items-center py-0.5 px-3 font-thin dark:hover:bg-primary-foreground w-16"
            onClick={() => {
              setMuted((prev) => !prev);
            }}
          >
            {muted ? (
              <MicrophoneMuteIcon className="w-5 h-5" />
            ) : (
              <MicrophoneIcon className="w-5 h-5" />
            )}
            <div className="text-xs">{muted ? "Unmute" : "Mute"}</div>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col justify-between items-center py-0.5 px-3 font-thin dark:hover:bg-primary-foreground"
          >
            <CameraIcon className="w-5 h-5" />
            <div className="text-xs">Start Video</div>
          </Button>
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
