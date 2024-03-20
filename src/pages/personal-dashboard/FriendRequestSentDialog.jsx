import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const FriendRequestSentDialog = ({ dialogRef, toggleDropdown }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="mb-2 md:mb-0">
          Send Friend Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[425px]" ref={dialogRef}>
        <DialogHeader>
          <DialogTitle>Friend Request Sent</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <h2>Your friend request has been sent to Charlie Brown.</h2>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="submit" onClick={toggleDropdown} className="w-full">
              Okay
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestSentDialog;
