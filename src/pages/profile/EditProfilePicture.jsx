import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil2Icon, AvatarIcon } from "@radix-ui/react-icons";

export function EditProfilePicture() {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileOnChange = (event) => {
    setFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  const deleteImage = () => {
    setPreviewImage(null);
  }

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("image", file, file.name);

    // Send HTTP request with formData to upload image
    console.log(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white border border-neutral-200 shadow w-[50px] h-[50px] rounded-full absolute bottom-0 right-5 hover:bg-slate-50 p-0">
          <Pencil2Icon className="text-black h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[456px] dark:border-neutral-800">
        <DialogHeader>
          <DialogTitle>Edit profile picture</DialogTitle>
          <DialogDescription>
            Select a jpg/jpeg or png image file to be your profile picture.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Container for profile picture and Upload Photo and Delete buttons */}
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <div className="bg-white h-[250px] w-[250px] rounded-full mb-[16px]">
              {previewImage ? (
                // Preview image
                <div
                  className="bg-cover bg-center h-full w-full rounded-full"
                  style={{ backgroundImage: `url(${previewImage})` }}
                />
              ) : (
                // Default icon
                <div className="flex justify-center items-center h-full w-full rounded-full border border-neutral-200">
                  <AvatarIcon className="text-black w-28 h-28" />
                </div>
              )}
            </div>
            {/* Upload Photo and Delete buttons */}
            <div className="flex justify-center w-full gap-3">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileOnChange}
              />
              {/* Choose Image Button */}
              <Button
                className="w-[120px]"
                onClick={() => fileInputRef.current.click()}
              >
                Choose Image
              </Button>
              {/* Delete Button */}
              <Button className="w-[120px]" onClick={deleteImage}>
                Delete
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-center w-full gap-3">
            {/* Cancel Button */}
            <DialogTrigger asChild>
              <Button className="w-[190px]">Cancel</Button>
            </DialogTrigger>
            {/* Save Button */}
            <DialogTrigger asChild>
              <Button onClick={handleFileUpload} className="w-[190px]">
                Save
              </Button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
