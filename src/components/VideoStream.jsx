import { useEffect, useRef, useState } from "react";

export default function VideoStream({ displayStream, cameraStream, className, ...props }) {
  const mainVideo = useRef(null);
  const secondaryVideo = useRef(null);
  const [swapStream, setSwapStream] = useState(false);
  const mainStream = displayStream && cameraStream ? (swapStream ? cameraStream : displayStream) : displayStream || cameraStream || null
  const secondaryStream = !displayStream ? null : cameraStream ? (swapStream ? displayStream : cameraStream) : cameraStream || null
  useEffect(() => {
    if (mainStream) mainVideo.current.srcObject = mainStream;
    if (secondaryStream) secondaryVideo.current.srcObject = secondaryStream;
  }, [mainStream, secondaryStream]);
  function onSecondaryClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setSwapStream(prev=>!prev)
  }
  return <div className={`${className} relative`}>
    {mainStream && <video ref={mainVideo} className={className + " relative !w-full"} {...props} autoPlay playsInline></video>}
    {secondaryStream && <video ref={secondaryVideo} className={className + " " + "absolute top-2 right-2 !w-[25%] outline outline-1 !rounded-sm"} {...props} autoPlay playsInline onClick={onSecondaryClick}></video>}
  </div>
}