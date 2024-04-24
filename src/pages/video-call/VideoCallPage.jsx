import React, { useEffect, useState } from "react";
import AvailableRooms from "./AvailableRooms";
import { peer } from "../../utils/globals";
import VideoCall from "./VideoCall";
import { loadTeams } from "../../utils/teamsHandler";
import { useNavigate, useParams } from "react-router-dom";

export default function VideoCallPage() {
  const [members, setMembers] = useState(peer.members);
  const [currentRoom, setCurrentRoom] = useState(peer.roomId);
  const [teams, setTeams] = useState({})
  const navigate = useNavigate()
  const {group, uid} = useParams()

  if (uid && teams[uid]) {
    peer.joinRoom(uid)
  }

  useEffect(() => {
    peer.addEventListener("usersChanged", () => {
      setMembers(peer.members);
      setCurrentRoom(peer.roomId);
    });

    loadTeams().then(data=>{
      const teams = data.data.reduce((prev, curr)=>{
        prev[curr.uid] = curr.name
        return prev
      },{})
      setTeams(teams)
    })
  }, []);


  return (
    <>{currentRoom ? <VideoCall /> : <AvailableRooms members={members} teams={teams}/>}</>
  );
}
