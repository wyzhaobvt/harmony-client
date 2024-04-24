import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

export default function RemoveFriendDialog({ handleRemoveFriend, handleClick }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the outside of the element is clicked
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        event.target.style.pointerEvents = "none";
      }
    };
    
    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialogRef]);

  return (
    <DialogContent
      className="flex flex-col max-w-[330px] sm:max-w-[456px] dark:border-neutral-800 rounded-l"
      ref={dialogRef}
      onClick={handleClick}
    >
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
  );
}
