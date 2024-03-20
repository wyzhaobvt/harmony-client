import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

const LeaveTeamDialog = ({dialogRef,toggleDropdown }) => {
    return ( 
        <Dialog >
        <DialogTrigger asChild >
        <Button className="w-[140px] h-[28px] px-[0px]"  variant="destructive">Leave Team</Button>
        </DialogTrigger >
        <DialogContent className="max-w-[300px] md:max-w-[425px] rounded-md" ref={dialogRef}>
          <DialogHeader>
            <DialogTitle>Leave Team</DialogTitle>
            
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              
             <h2>Are you sure you want to leave this team?</h2>
            </div>
           
          </div>
          <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
          <Button type="button" variant="secondary" className="w-[130px] bg-white text-black border border-primary" onClick={toggleDropdown}>Cancel</Button>
          </DialogClose>
            <Button type="submit" onClick={toggleDropdown}>Leave Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
     );
}
 
export default LeaveTeamDialog;