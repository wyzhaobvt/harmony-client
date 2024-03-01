import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function VideoSelector({ triggerButton, onStream }) {
  const [mediaDevices, setMediaDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [streams, setStreams] = useState({myStream: true, camera: null, display: null})
  const hasPermission = "mediaDevices" in navigator

  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      setMediaDevices(
        devices.filter((a) => a.kind === "videoinput" && a.deviceId)
      );
    }) || [];
  }, []);

  function handleSelectDisplayClick() {
    if (streams.display) {
      streams.display.getTracks().forEach(track=>{
        track.stop()
      })
      const obj = {
        ...streams,
        display: null
      }
      setStreams(obj)
      if (typeof onStream === "function") onStream(obj);
      return
    }
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        const obj = {
          ...streams,
          display: stream
        }
        setStreams(obj)
        if (typeof onStream === "function") onStream(obj);
      })
      .catch(() => {});
  }

  function handleSelectCameraClick() {
    if (streams.camera) {
      streams.camera.getTracks().forEach(track=>{
        track.stop()
      })
      const obj = {
        ...streams,
        camera: null
      }
      setStreams(obj)
      if (typeof onStream === "function") onStream(obj);
      return
    }
    navigator.mediaDevices
      .getUserMedia({
        video:
          selectedCamera === "default"
            ? true
            : { deviceId: {exact: mediaDevices[selectedCamera].deviceId} },
      })
      .then((stream) => {
        const obj = {
          ...streams,
          camera: stream,
        }
        setStreams(obj)
        if (typeof onStream === "function") onStream(obj);
      })
      .catch(() => {});
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent className="w-auto h-auto border-input m-5">
        <div className="flex gap-5">
          <div className={`flex items-center ${streams.display && "text-red-600"}`}>
            <Button disabled={!hasPermission} onClick={handleSelectDisplayClick}>{ streams.display ? "Stop Display" : "Select Display"}</Button>
          </div>
          <div className="h-auto flex flex-col justify-center items-center">
            <Separator orientation="vertical" className="h-2/5 w-[2px]" />
            <span className={`text-zinc-600 ${!hasPermission && "!text-red-300"}`}>{hasPermission ? "or" : "No Permission"}</span>
            <Separator orientation="vertical" className="h-2/5 w-[2px]" />
          </div>
          <div className="flex flex-col items-center">
            <Select
              onValueChange={(value) => {
                setSelectedCamera(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Camera" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cameras</SelectLabel>
                  <SelectItem value="default">Default</SelectItem>
                  {mediaDevices.map((device, i) => {
                    return (
                      <SelectItem key={i} value={i}>
                        {device.label || "Camera " + (i + 1)}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              disabled={!hasPermission || selectedCamera === null}
              className={`mt-5 ${streams.camera && "text-red-600"}`}
              onClick={handleSelectCameraClick}
            >
              {streams.camera ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
