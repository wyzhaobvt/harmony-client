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

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setMediaDevices(
        devices.filter((a) => a.kind === "videoinput" && a.deviceId)
      );
    });
  }, []);

  function handleSelectDisplayClick() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        if (typeof onStream === "function") onStream(stream);
      })
      .catch(() => {});
  }

  function handleSelectCameraClick() {
    navigator.mediaDevices
      .getUserMedia({
        video:
          selectedCamera === "default"
            ? true
            : { deviceId: {exact: mediaDevices[selectedCamera].deviceId} },
      })
      .then((stream) => {
        if (typeof onStream === "function") onStream(stream);
      })
      .catch(() => {});
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent className="w-auto h-auto border-input m-5">
        <div className="flex gap-5">
          <div className="flex items-center">
            <Button onClick={handleSelectDisplayClick}>Select Display</Button>
          </div>
          <div className="h-auto flex flex-col justify-center items-center">
            <Separator orientation="vertical" className="h-2/5 w-[2px]" />
            <span className="text-zinc-600">or</span>
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
              disabled={selectedCamera === null}
              className="mt-5"
              onClick={handleSelectCameraClick}
            >
              Start Camera
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
