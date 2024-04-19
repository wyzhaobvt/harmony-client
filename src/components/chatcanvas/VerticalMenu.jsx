import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RemoveFriendDialog from "../../pages/personal-dashboard/RemoveFriendDialog";

const handleClick = (event) => {
  event.stopPropagation();
};

const VerticalMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex justify-center items-center rounded-full hover:dark:bg-neutral-800 hover:bg-neutral-200 size-8">
          <DotsVerticalIcon className="min-w-4 min-h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={handleClick}>
        <RemoveFriendDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VerticalMenu;
