import Peer from "./Peer";
import { io } from "socket.io-client";
import { getPeerAuthToken } from "./authHandler";

const globals = {
  email: localStorage.getItem("harmony_email"),
  teamsCache: {},
};

export default globals;

/**
 * Used to set the value of `globals.teamsCache` using the response from `loadTeams()` in `teamsHandler.js`
 * @typedef {{uid: string, name: string, owned: boolean, teamCallLink: string}} TeamData
 * @param {TeamData[]} teams
 * @returns {{[teamUid: string]: TeamData}}
 */
export function cacheTeams(teams) {
  const obj = teams.reduce((prev, curr) => {
    prev[curr.uid] = curr;
    return prev;
  }, {});
  globals.teamsCache = obj;
  return obj;
}

const socket = io(import.meta.env.VITE_SIGNALING_SERVER_ORIGIN, {
  auth: {
    token: localStorage.getItem("harmony_peer_token"),
  },
});

export const peer = new Peer({ socket });

peer.addEventListener("connectionError", (cb) => {
  getPeerAuthToken(cb);
});

peer.addEventListener("usersChanged", () => {
  if (
    peer.roomId &&
    !peer.myStreams.has("microphone") &&
    localStorage.getItem("harmony_microphone_id")
  ) {
    peer.startMicrophone(true, {
      audio: {
        deviceId: { exact: localStorage.getItem("harmony_microphone_id") },
      },
    });
  }
});
