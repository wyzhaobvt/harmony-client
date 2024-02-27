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
                  <div className="d-flex w-full ml-6 mb-0" style={{borderRadius: '8px', padding: 4}}>
                    <HamburgerMenuIcon className="mr-3 mt-1 h-7 w-7"/>
                    <h1 className="text-2xl font-bold mb-0">Harmony</h1>
                  </div>
                </DrawerTrigger>
                <hr className="mb-2 text-black dark:text-white bg-black dark:bg-white" style={{ borderColor: 'black', height: '3px' }}/>
              </DrawerTitle>
              <DrawerDescription asChild className="p-0 mt-2 ml-0">
                <div className="">
                  <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><LayoutDashboardIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Dashboard</Button></div>
                  <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><ChatBubbleIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Chat</Button></div>
                  <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><UsersIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Groups</Button></div>
                  <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><FilesIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>File Management</Button></div>
                  <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><CalendarIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Calendar</Button></div>
                  <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><CircleUserRoundIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Profile</Button></div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="w-full"><LogOutIcon className="mr-2 h-6 w-6"/>Logout</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default Sidebar