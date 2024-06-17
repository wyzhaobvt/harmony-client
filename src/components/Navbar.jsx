import ThemeSwitcher from "./ThemeSwitcher";
import Sidebar from "./Sidebar";
import { PhoneCall } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import globals, { peer } from "../utils/globals";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const team = globals.teamsCache[peer.roomId];
  return (
    <nav className="z-50 w-full bg-background sticky top-0 flex items-center px-3 justify-between group shadow-md dark:shadow-black">
      <div className="flex items-center gap-3">
        <Sidebar />
        <Link to="/">
          <div className="font-bold text-2xl">Harmony</div>
        </Link>
        {!location.pathname.startsWith("/video") && peer.roomId && (
          <div
            className="border-green-500 border-2 rounded-full ml-5 px-3 flex items-center justify-evenly gap-3 cursor-pointer h-7 max-h-7"
            onClick={() => {
              if (team)
                navigate(
                  `/video/${team.name.toLowerCase().replaceAll(" ", "-")}/${
                    peer.roomId
                  }`
                );
              else navigate("/video");
            }}
          >
            <PhoneCall className="h-4 text-green-500" />
            {team && (
              <span className="whitespace-nowrap hidden sm:block max-w-48 overflow-hidden overflow-ellipsis">
                {team.name}
              </span>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="justify-self-end flex items-center w-6 h-6">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
