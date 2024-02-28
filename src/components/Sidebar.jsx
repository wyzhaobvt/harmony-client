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
import { Link } from "react-router-dom"

const links = [
  {
    icon: <LayoutDashboardIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>,
    name: "Dashboard",
    path: "/"
  },
  {
    icon: <ChatBubbleIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>,
    name: "Chat",
    path: "/chat"
  },
  {
    icon: <UsersIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>,
    name: "Groups",
    path: "/groups"
  },
  {
    icon: <FilesIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>,
    name: "File Management",
    path: "/files"
  },
  {
    icon: <CalendarIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>,
    name: "Calendar",
    path: "/calendar"
  },
  {
    icon: <CircleUserRoundIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>,
    name: "Profile",
    path: "/profile"
  },
]

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
            </DrawerHeader>
            <div className="p-0 mt-2 ml-0">
              {links.map(({name, icon, path}, i)=>{
                return (
                  <DrawerClose key={i} asChild>
                    <div className="mb-6 sidebar-menu-item">
                      <Link to={path}>
                      <Button
                        className="text-lg w-full justify-start p-7 h-10"
                        variant="ghost"
                      >
                        {icon}
                        {name}
                      </Button>
                  </Link>
                    </div>

                  </DrawerClose>
                );
              })}
              {/* <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><ChatBubbleIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Chat</Button></div>
              <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><UsersIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Groups</Button></div>
              <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><FilesIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>File Management</Button></div>
              <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><CalendarIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Calendar</Button></div>
              <div className="mb-6 sidebar-menu-item"><Button className="text-lg w-full justify-start p-7 h-10" variant="ghost"><CircleUserRoundIcon className="mr-2 h-6 w-6 text-black dark:text-white"/>Profile</Button></div>
              <div className="">
              </div> */}
            </div>
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