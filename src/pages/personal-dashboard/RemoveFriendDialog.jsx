import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

export default function RemoveFriendDialog({ className }) {
  const handleRemoveFriend = () => {
    console.log("Friend removed");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-7">Remove Friend</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-[330px] sm:max-w-[456px] dark:border-neutral-800 rounded-l">
        <DialogHeader className="text-left">
          <DialogTitle>Remove friend</DialogTitle>
          <DialogDescription>
            Select a jpg/jpeg or png image file to be your profile picture.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-center w-full gap-3">
            {/* Cancel Button */}
            <DialogClose asChild>
              <Button variant="outline" className="w-[190px]">
                Cancel
              </Button>
            </DialogClose>
            {/* Remove Friend Button */}
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={handleRemoveFriend}
                className="w-[190px]"
              >
                Remove Friend
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
