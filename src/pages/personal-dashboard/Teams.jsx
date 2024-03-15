import React, { useEffect, useRef, useState } from "react";
import InviteMembers from "./InviteMembers";
import LeaveTeamDialog from "./LeaveTeamDialog";
import DeleteTeamDialog from "./DeleteTeamDialog";
import ManageMembersDialog from "./ManageMembersDialog"
function Teams({ name }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dialogRef = useRef(null);
  const [isTeamOwner, setIsTeamOwner] = useState(true);
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (
      !dialogRef.current &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="border border-input rounded-md flex p-3 mb-2 flex-col relative">
      <div className="team-body flex justify-between w-full">
        <div>
          <h1 className="font-semibold text-xl me-auto">{name}</h1>
        </div>
        <div className="flex items-center">
          <button ref={dropdownRef} className="me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-gear-fill dropdown-icon"
              viewBox="0 0 16 16"
              onClick={toggleDropdown}
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="dropdown-menu rounded-md border w-40 px-2 py-4 absolute right-0 top-10 z-10 bg-slate-50 "
          ref={dropdownRef}
        >
          {isTeamOwner ? (
            <div className="flex flex-col">
              <InviteMembers
                dialogRef={dialogRef}
                toggleDropdown={toggleDropdown}
              />
                            <ManageMembersDialog
               dialogRef={dialogRef}
               toggleDropdown={toggleDropdown}/>
              <DeleteTeamDialog
                dialogRef={dialogRef}
                toggleDropdown={toggleDropdown}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <InviteMembers
                dialogRef={dialogRef}
                toggleDropdown={toggleDropdown}
              />
              <LeaveTeamDialog
                dialogRef={dialogRef}
                toggleDropdown={toggleDropdown}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Teams;
