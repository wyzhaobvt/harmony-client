import Peer from "./Peer";
import { io } from "socket.io-client";
import { getPeerAuthToken } from "./db";

const globals = {
  email: localStorage.getItem("harmony_email")
}

export default globals

const socket = io(import.meta.env.VITE_SERVER_ORIGIN, {
  withCredentials: true
})

socket.on("connect_error", (err)=>{
  const {attempts} = socket.io.backoff

  if (attempts >= 5) {
    socket.close()
    console.error("Could not connect to server. Socket closed, refresh to try again")
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
