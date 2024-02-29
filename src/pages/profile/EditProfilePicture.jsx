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
            <div className="bg-white border border-neutral-200 h-[250px] w-[250px] rounded-full flex items-center justify-center relative mb-[16px]">
              <AvatarIcon className="text-black w-28 h-28" />
            </div>
            {/* Upload Photo and Delete buttons */}
            <div className="flex justify-center w-full gap-3">
              <Button className="w-[120px]">Upload Photo</Button>
              <Button className="w-[120px]">Delete</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-center w-full gap-3">
            <DialogTrigger>
              <Button className="w-[190px]">Cancel</Button>
            </DialogTrigger>
            <Button type="submit" className="w-[190px]">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
