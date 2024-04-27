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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createTeam, loadTeams } from "../../utils/teamsHandler";
import globals from "../../utils/globals";
const CreateTeamDialog = ({ setTeams }) => {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");

  function handleInputChange(event) {
    setTeamName(event.target.value);
  }

  function handleSubmitClick(event) {
    if (!teamName) {
      setError("Invalid Team Name");
      return;
    }

    createTeam({ teamName }).then((data) => {
      if (!data.success) {
        event.preventDefault();
        setError(data.message);
        return;
      }
      loadTeams().then((data) => {
        data.data.forEach((team) => {
          globals.teamsCache[team.uid] = team;
        });
        setTeams(data.data);
        setOpen(false);
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <svg
            type="button"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Team Name
            </Label>
            <Input
              id="name"
              placeholder="Enter Team Name"
              defaultValue={teamName}
              className="col-span-3"
              onChange={handleInputChange}
            />
            {error && (
              <small className="ml-1 text-red-500 font-semibold">{error}</small>
            )}
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
          <Button
            type="submit"
            className="md:w-[130px] mb-2 md:mb-0"
            onClick={handleSubmitClick}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
