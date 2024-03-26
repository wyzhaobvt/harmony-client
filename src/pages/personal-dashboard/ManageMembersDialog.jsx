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
import { Input } from "@/components/ui/input";
import FriendRequestSentDialog from "./FriendRequestSentDialog";
const InviteMembers = ({ dialogRef, toggleDropdown }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[140px] h-[28px] px-[0px] mb-1">
          Manage Members
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[300px] md:max-w-[425px] rounded-md"
        ref={dialogRef}
      >
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=""></div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="md:w-[130px] bg-white text-black border border-primary"
              onClick={toggleDropdown}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="md:w-[130px] mb-2 md:mb-0"
            onClick={toggleDropdown}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
