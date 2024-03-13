import Peer from "./Peer";
import { io } from "socket.io-client";
import { getPeerAuthToken } from "./db";

const globals = {}

export default globals

const socket = io(import.meta.env.VITE_SIGNALING_SERVER_ORIGIN, {
  auth: {
    token: "test"
  }
})

export const peer = new Peer({socket})

peer.addEventListener("connectionError", (cb) => {
  getPeerAuthToken(cb)
})

peer.addEventListener("usersChanged", () => {
  if (peer.roomId && !peer.myStreams.has("microphone")) {
    peer.startMicrophone(true)
  }
})
