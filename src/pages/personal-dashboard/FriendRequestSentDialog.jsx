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

const FriendRequestSentDialog = ({ onClick, errorMessage }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="mb-2 md:mb-0" onClick={onClick}>
          Send Team Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {errorMessage ? "Request Failed" : "Request Sent"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <h2>
              {errorMessage ||
                "Your friend request has been sent to Charlie Brown."}
            </h2>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Okay
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestSentDialog;
