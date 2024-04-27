import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadMembers } from "../../utils/teamsHandler";
import { CrownIcon } from "lucide-react";

function GroupMembers({ groupName, groupUid }) {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    loadMembers({ teamName: groupName, teamUid: groupUid }).then((data) => {
      if (!data.success) return
      setMembers(data.data);
    });
  }, []);

  return (
    <div className="rounded-md p-3">
      <div className="">
        <Dialog>
          <DialogTrigger className="hover:bg-primary/10 font-bold py-1 px-3 rounded">
            <h1 className="font-semibold text-md">{groupName}</h1>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Group Members</DialogTitle>
              <DialogDescription asChild>
                <div className="">
                  {members.map((member, index) => (
                    <p key={index}>
                      {member.username}
                      {member.owner && <CrownIcon className="inline w-4 h-4 ml-2 text-amber-500" />}
                    </p>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default GroupMembers;
