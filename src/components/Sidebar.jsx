import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Button } from "@/components/ui/button"
  import { HomeIcon, ChatBubbleIcon, CalendarIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
  import { CircleUserRoundIcon, FilesIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon } from "lucide-react"

function Sidebar() {
    return (
      <>
        <Drawer direction='left'>
          <DrawerTrigger className="mt-1 ml-5">
            <HamburgerMenuIcon className="mr-0 h-7 w-7"/> 
          </DrawerTrigger>
          <DrawerContent className='top-0 right-0 left-0 mt-0 w-[250px] rounded-none'>
            <DrawerHeader>
              <DrawerTitle className="mb-2">
                <DrawerTrigger className="d-inline mb-2">
                <div className="d-flex w-full" style={{borderRadius: '8px', padding: 10}}>
                  <HamburgerMenuIcon className="mr-3 mt-1 h-7 w-7"/>
                  <h1 className="text-2xl font-bold">Harmony</h1>
                </div>
                </DrawerTrigger>
                <hr style={{  background: 'black', color: 'black', borderColor: 'black', height: '3px', }}/>
              </DrawerTitle>
              <DrawerDescription className="p-0 mt-2">
                <div className="mb-6 sidebar-menu-item"><Button className="text-lg h-15 w-full justify-start" variant="ghost"><LayoutDashboardIcon className="mr-2 h-8 w-8" style={{color: 'black'}}/>Dashboard</Button></div>
                <div className="mb-6 sidebar-menu-item"><Button className="text-lg h-15 w-full justify-start" variant="ghost"><ChatBubbleIcon className="mr-2 h-6 w-6" style={{color: 'black'}}/>Chat</Button></div>
                <div className="mb-6 sidebar-menu-item"><Button className="text-lg h-15 w-full justify-start" variant="ghost"><UsersIcon className="mr-2 h-6 w-6" style={{color: 'black'}}/>Groups</Button></div>
                <div className="mb-6 sidebar-menu-item"><Button className="text-lg h-15 w-full justify-start" variant="ghost"><FilesIcon className="mr-2 h-6 w-6" style={{color: 'black'}}/>File Management</Button></div>
                <div className="mb-6 sidebar-menu-item"><Button className="text-lg h-15 w-full justify-start" variant="ghost"><CalendarIcon className="mr-2 h-6 w-6" style={{color: 'black'}}/>Calendar</Button></div>
                <div className="mb-6 sidebar-menu-item"><Button className="text-lg h-15 w-full justify-start" variant="ghost"><CircleUserRoundIcon className="mr-2 h-6 w-6 " style={{color: 'black'}}/>Profile</Button></div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button className="w-full"><LogOutIcon className="mr-2 h-6 w-6"/>Logout</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default Sidebar