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
import { useState } from "react";
const InviteMembers = ({inviteMember}) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  function handleInputChange(event) {
    setEmail(event.target.value)
  }

  function handleSendInvite() {
    if (!email) return
    inviteMember(email).then(data=>{
      if (!data.success) setError(data.message)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[140px] h-[28px] px-[0px] mb-1">
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[300px] md:max-w-[425px] rounded-md"
      >
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Input id="name" placeholder={"Enter Users Email"} value={email} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="md:w-[130px] bg-white text-black border border-primary"
            >
              Cancel
            </Button>
          </DialogClose>
          <FriendRequestSentDialog onClick={handleSendInvite} errorMessage={error}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
