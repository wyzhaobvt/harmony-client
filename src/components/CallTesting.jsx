import React, { useEffect, useState } from "react";
import { addToTeam } from "../utils/db.js";
import globals, { peer } from "../utils/globals.js";

export default function CallTesting() {
  const [data, setData] = useState({
    email: null,
    password: null,
    teamUser: null,
    teamId: null,
    teamName: null,
    joinCall: null,
    users: [],
    groups: [],
    error: null,
  });

  const [members, setMembers] = useState(peer.members);

  useEffect(() => {
    peer.addEventListener("usersChanged", function (data) {
      setMembers(data);
    });
  }, []);

  function handleInput(event, key) {
    const value = event.target.value;
    setData((prev) => {
      return { ...prev, [key]: value, error: null };
    });
  }

  function handleJoinTeam() {
    if (!data.teamUser || !data.teamId || !data.teamName) {
      setData((prev) => {
        return { ...prev, error: "missing fields" };
      });
      return;
    }
    addToTeam({
      teamId: data.teamId,
      targetEmail: data.teamUser,
      teamName: data.teamName,
    }).then((d) => {
      setData((prev) => {
        return { ...prev, error: d.success ? "added to team" : d.message };
      });
    });
  }

  return (
    <div className="fixed top-14">
      <div>
        {globals.email || "Not Logged In"}<small className="text-red-500">{data.error}</small>
      </div>
      <div className="flex [&>div]:flex [&>div]:flex-col gap-2">
        <div>
          <input
            type="text"
            placeholder="user email"
            onInput={(e) => handleInput(e, "teamUser")}
          />
          <input
            type="text"
            placeholder="team id"
            onInput={(e) => handleInput(e, "teamId")}
          />
          <input
            type="text"
            placeholder="team name"
            onInput={(e) => handleInput(e, "teamName")}
          />
          <button className="bg-gray-500" onClick={handleJoinTeam}>
            add to team
          </button>
        </div>
        <div>
          <div>Users</div>
          {Object.keys(members.users)
            .filter((userId) => userId !== peer.socketId)
            .map((userId, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    peer.call(userId);
                  }}
                >
                  {members.users[userId].uid}
                </button>
              );
            })}
        </div>
        <div>
          Groups
          {Object.keys(members.groups).map((groupId, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  peer.joinRoom(groupId);
                }}
              >
                {groupId.slice(0, 10)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
