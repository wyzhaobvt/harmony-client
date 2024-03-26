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
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[300px] md:max-w-[425px] rounded-md"
        ref={dialogRef}
      >
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Input id="name" value="?" className="col-span-3" />
          </div>
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
          <FriendRequestSentDialog toggleDropdown={toggleDropdown} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
