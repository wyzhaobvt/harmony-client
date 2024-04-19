import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FileManagement from "./FileManagement";
import AvailableTeams from "./AvailableTeams";
import globals, { cacheTeams } from "../../utils/globals";
import { loadTeams } from "../../utils/teamsHandler";

export default function FileManagementPage() {
  const [teams, setTeams] = useState(Object.values(globals.teamsCache));

  const location = useLocation();

  const [, , teamId, ...path] = location.pathname.split("/");

  useEffect(() => {
    loadTeams().then((data) => {
      if (!data.success) return;
      setTeams(data.data);
      cacheTeams(data.data);
    });
  }, []);

  return (
    <div className="w-full md:w-4/5 px-5 md:px-0 mb-5">
      {!teamId ||
      (teamId && teams.length && !teams.find((a) => a.uid === teamId)) ? (
        <>
          <AvailableTeams teams={teams} />
        </>
      ) : (
        <FileManagement />
      )}
    </div>
  );
}
