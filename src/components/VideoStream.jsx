import { useEffect, useRef, useState } from "react";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import isMobileDevice from "../utils/isMobileDevice";

export default function VideoStream({
  displayStream,
  cameraStream,
  className,
  ...props
}) {
  const mainVideo = useRef(null);
  const secondaryVideo = useRef(null);
  const [swapStream, setSwapStream] = useState(false);
  const mainStream =
    displayStream && cameraStream
      ? swapStream
        ? cameraStream
        : displayStream
      : displayStream || cameraStream || null;
  const secondaryStream = !displayStream
    ? null
    : cameraStream
    ? swapStream
      ? displayStream
      : cameraStream
    : cameraStream || null;
  useEffect(() => {
    if (mainStream) mainVideo.current.srcObject = mainStream;
    if (secondaryStream) secondaryVideo.current.srcObject = secondaryStream;
  }, [mainStream, secondaryStream]);
  function onSecondaryClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setSwapStream((prev) => !prev);
  }
  return (
    <div className={`${className} relative`}>
      
      {!isMobileDevice() && <div className="bg-[linear-gradient(0deg,black,#00000066,transparent)] w-full h-14 absolute bottom-0 z-10 group-hover:flex hidden items-center px-4 justify-end">
        <EnterFullScreenIcon className="h-6 w-6 cursor-pointer" onClick={()=>{
          const el =  mainVideo.current
          if (el.requestFullScreen) {
            el.requestFullScreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
          }
        }}/>
      </div>}
      {mainStream && (
        <video
          ref={mainVideo}
          className={`${className} relative !w-full`}
          {...props}
          autoPlay
          playsInline
        ></video>
      )}
      {secondaryStream && (
        <video
          ref={secondaryVideo}
          className={`${className} absolute top-2 right-2 !w-[25%] outline outline-1 !rounded-sm`}
          {...props}
          autoPlay
          playsInline
          onClick={onSecondaryClick}
        ></video>
      )}
    </div>
  );
}
