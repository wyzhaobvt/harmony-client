import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Half2Icon } from "@radix-ui/react-icons";
import setTheme from "../utils/setTheme";

export default function ThemeSwitcher() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Half2Icon className="w-full h-full" />
      </PopoverTrigger>
      <PopoverContent className="w-auto border-input">
        <div className="flex flex-col w-20 gap-1">
          <PopoverClose asChild>
            <Button className="w-full" variant="secondary" onClick={()=>setTheme("light")}>
              Light
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button className="w-full" variant="secondary" onClick={()=>setTheme("dark")}>
              Dark
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button className="w-full" variant="secondary" onClick={()=>setTheme("os")}>
              OS
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
