import React, { useState, useEffect } from "react";
import DashboardCalendar from "./DashboardCalendar";
import DashboardMessages from "./DashboardMessages";
import GroupMembers from "./GroupMembers";
import "./GroupDashboard.css";
import { DateTime } from "luxon";
import { useNavigate, useParams } from "react-router-dom";
import { loadChat } from "../../utils/chatHandler";
import { loadTeams } from "../../utils/teamsHandler";
import globals from "../../utils/globals";

function GroupDashboard() {
  const { group, uid } = useParams();
  const navigate = useNavigate();

  // replace group1 with fetched name at some point?
  const [groupName, setGroupName] = React.useState(null);

  const today = DateTime.local().toISODate();

  const [date, setDate] = React.useState(today);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadTeams()
      .then((data) => {
        data.data.forEach((team) => (globals.teamsCache[team.uid] = team));
        return data.data.find((team) => team.uid === uid);
      })
      .then((team) => {
        if (team.name.toLowerCase().replaceAll(" ", "-") !== group) {
          navigate("/personalDashboard");
          return;
        }
        setGroupName(team.name);
        loadChat({ teamName: team.name, teamUid: uid }).then((data) => {
          if (!data.success) return;
          setMessages(data.data);
        });
      })
      .catch((error) => {
        console.error("error occurred while loading team chat");
        navigate("/personalDashboard");
      });
  }, []);

  return (
    <div className="md:w-3/4 xl:w-7/12 flex justify-center px-2">
      {groupName && 
      <div className="content-body flex w-full">
        <DashboardMessages
          date={date}
          setDate={setDate}
          messages={messages}
          setMessages={setMessages}
          groupName={groupName}
          setGroupName={setGroupName}
        />
        <div className="hidden xl:block">
          <DashboardCalendar
            date={date}
            setDate={setDate}
            groupName={groupName}
          />
        </div>
      </div>
      }
    </div>
  );
}

export default GroupDashboard;
