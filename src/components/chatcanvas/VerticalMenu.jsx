import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import RemoveFriendDialog from "../../pages/personal-dashboard/RemoveFriendDialog";

const handleClick = (event) => {
  event.stopPropagation();
};

const VerticalMenu = ({ handleRemoveFriend, username }) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex justify-center items-center rounded-full hover:dark:bg-neutral-800 hover:bg-neutral-200 size-8">
            <DotsVerticalIcon className="min-w-4 min-h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={handleClick}>
          <DialogTrigger asChild>
            <DropdownMenuItem variant="ghost" className="h-7">
              Remove Friend
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveFriendDialog
        handleRemoveFriend={handleRemoveFriend}
        handleClick={handleClick}
        username={username}
      />
    </Dialog>
  );
};

export default VerticalMenu;
