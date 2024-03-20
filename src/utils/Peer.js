/**
 * @typedef {{peer: RTCPeerConnection, streams: Map<MediaStream, [streamType: string]>, types: {[streamId: string]: [streamType: string]}}} RTCConnections
 * @typedef {"camera" | "screen" | "microphone"} StreamType
 * @typedef {"incoming" | "outgoing"} ConnectionDirection
 * @typedef {{camera: string, screen: string, microphone: string}} DeviceIds
 * @typedef {{[socketId: string]: {[streamType: string]: MediaStream}}} IncomingStreams
 * @typedef {{users: {[socketId: string]: { username: string, uid: string }}, groups: {[groupUid: string]: [socketId: string][]}}} MembersData
 * @typedef {"ready" | "connectionError" | "receivingChanged" | "usersChanged" | "callInvite" | "callRejected"} EventListenerType
 */

/**
 * @callback ReadyCallback
 * @param {Peer} param0
 */

/**
 * @callback ReceivingChangedCallback
 * @param {[socketId: string]} param0 id from socket
 * @param {[streamType: string]} param1 type of stream
 * @param {[status: "add" | "remove"]} param2 whether connection was created or ended
 * @param {[streams: IncomingStreams]} param3 current streams being received
 */

/**
 * Callback function called when users or groups are changed.
 * @callback UsersChangedCallback
 * @param {MembersData} data - Data object containing information about users and groups.
 */

/**
 * sending camera
 * sending screen /w desktop audio
 * sending mic
 */
const configuration = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
  ],
};
const MICROPHONE = "microphone";
const CAMERA = "camera";
const SCREEN = "screen";

/**
 * @type {Map<[streamType: string], MediaStream>}
 */
const myStreams = new Map();

export default class Peer {
  /**
   * @type {{[type: string]: Set<function>}}
   */
  #eventListeners = {};
  #members = {
    users: {},
    groups: {},
  };
  #privateRoomId = null;
  #roomId = null;
  #socketId = null;
  #isMicrophoneMuted = true;
  /**
   * @param {{
   *  socket: object,
   *  deviceIds: DeviceIds,
   *  authToken: string,
   * }} config
   */
  constructor(config) {
    this.config = config;
    this.socket = this.config.socket;
    this.authToken = this.config.authToken;

    /** @type {DeviceIds} */
    this.deviceIds = this.config.deviceIds;

    /**
     * all peer connections
     * @type {Map<[socketId: string],RTCConnections>}
     */
    this.connections = new Map();

    /** @type {ReadyCallback} */
    this.onReady = null;

    /**
     * @example
     * peer.onConnectionError = (callback) => {
     *   const token = getSignalingToken()
     *   callback(token)
     * }
     */
    this.onConnectionError = null;

    /** @type {ReceivingChangedCallback} */
    this.onReceivingChanged = null;

    /**
     * triggered when users come connect, disconnect, join, or leave groups
     * @type {UsersChangedCallback}
     * @example
     * peer.onUsersChanged = ({users, groups}) => {
     *   for (const groupId in groups) {
     *     addUsersToRoom(groupId, groups[groupId])
     *   }
     * }
     */
    this.onUsersChanged = null;

    /**
     * triggered when user receives a call request
     * @example
     * peer.onCallInvite = ({username, socketId}, accept, reject) => {
     *   // show message
     *
     *   // on click accepted call
     *     accept() // joins call
     *
     *   // on click reject call
     *     reject() // sends reject message
     * }
     */
    this.onCallInvite = null;

    /**
     * triggers when user being called rejects your call
     * @example
     * peer.onCallRejected = (socketId) => {
     * }
     */
    this.onCallRejected = null;
  }

  set socket(socket) {
    if (socket == null)
      throw "set 'socket' to socket.io socket to start connection";
    this.config.socket = socket;
    this.#setup();
    return socket;
  }

  get socket() {
    return this.config.socket;
  }

  set authToken(token) {
    if (!token) return;
    this.config.authToken = token;
    this.#setup();
    return token;
  }

  get authToken() {
    return this.config.authToken;
  }

  get roomId() {
    return this.#roomId;
  }

  get socketId() {
    return this.#socketId;
  }

  get isMicrophoneMuted() {
    return this.#isMicrophoneMuted;
  }

  /**
   * Streams running
   * @type {Map<[streamType: string], MediaStream>}
   */
  get myStreams() {
    return myStreams;
  }

  /**
   * Incoming streams
   * @type {IncomingStreams}
   */
  get streams() {
    return this.#getStreams();
  }

  /**
   * @type {MembersData}
   */
  get members() {
    return this.#members;
  }

  /**
   *
   * @param {EventListenerType} type
   * @param {Function} listener
   */
  addEventListener(type, listener) {
    this.#eventListeners[type] ??= new Set();
    this.#eventListeners[type].add(listener);
  }

  removeEventListener(type, listener) {
    const obj = this.#eventListeners[type];
    if (!obj) return;
    obj.delete(listener);
  }

  /**
   * joins room
   * @param {string} roomId if of room to join
   * @returns {Promise<string>}
   * @throws {Error}
   */
  joinRoom(roomId) {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await this.socket.emitWithAck("peer:joinCall", roomId);
        if (room !== this.#roomId) {
          this.#closeAllConnections();
          this.#stopAllStreams();
        }
        this.#roomId = room;
        resolve(room);
      } catch (error) {
        reject(error);
      }
    });
  }

  leaveRoom() {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.#roomId) {
          return;
        }
        this.#roomId = null;
        this.#privateRoomId = null;
        this.#closeAllConnections();
        this.#stopAllStreams();
        this.socket.emit("peer:leaveCall");
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * calls socket using socket id
   * @param {string} socketId socket id of socket to call
   * @returns {Promise<string>}
   */
  call(socketId) {
    return this.#call("socket", socketId);
  }

  /**
   * calls socket using uid
   * @param {string} userId public id connected to socket
   * @returns {Promise<string>}
   */
  callUser(userId) {
    return this.#call("uid", userId);
  }

  /**
   * attempts to call user
   * @param {"socket" | "uid"} type type of id being sent
   * @param {string} id id to send call request to
   * @returns {Promise<string>} roomId
   * @throws {Error}
   */
  #call(type, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const ack = await this.socket.emitWithAck("peer:callUser", {
          type,
          id,
        });
        if (!ack.success) throw new Error(ack.message);
        this.#privateRoomId = ack.roomId;
        resolve(await this.joinRoom(ack.roomId));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *
   * @param {boolean | null} isMuted sets microphone muted state; `null` if no microphone running
   */
  muteMicrophone(isMuted) {
    if (!myStreams.has(MICROPHONE)) return null;
    myStreams
      .get(MICROPHONE)
      .getAudioTracks()
      .forEach((track) => {
        track.enabled = !isMuted;
      });
    this.#isMicrophoneMuted = isMuted;
    return isMuted;
  }

  /**
   *
   * @param {MediaStreamConstraints | MediaStream | null} [stream=null]
   * @returns {Promise<MediaStream}> stream being shared
   */
  startMicrophone(muted, stream = null) {
    if (stream) {
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((track) => {
          track.enabled = !muted;
        });
      }
      const mic = this.startStream(MICROPHONE, stream);
      mic.then((stream) => {
        stream.getTracks().forEach((track) => {
          track.enabled = !muted;
        });
      });
      return mic;
    }
    const mic = this.startStream(MICROPHONE, {
      // autoGainControl: { ideal: true },
      // noiseSuppression: { ideal: true },
      // echoCancellation: { ideal: true },
      audio: { deviceId: { ideal: "default" } },
    });
    mic.then((micStream) => {
      micStream.getTracks().forEach((track) => {
        track.enabled = !muted;
      });
    });
    return mic;
  }

  /**
   * @param {MediaStreamConstraints | MediaStream | null} [stream=null]
   * @returns {Promise<MediaStream>} stream being shared
   */
  startCamera(stream = null) {
    if (stream) {
      return this.startStream(CAMERA, stream);
    }
    return this.startStream(CAMERA, {
      video: { deviceId: { ideal: "default" } },
    });
  }

  /**
   * @param {MediaStreamConstraints | MediaStream | null} [stream=null]
   * @returns {Promise<MediaStream>} stream being shared
   */
  startScreen(stream = null) {
    if (stream) {
      return this.startStream(SCREEN, stream);
    }
    return this.startStream(SCREEN, {});
  }

  /**
   *
   * @param {StreamType} type type of stream being sent
   * @param {MediaStreamConstraints | MediaStream} stream stream to send
   * @returns {Promise<MediaStream>} stream being shared
   */
  startStream(type, stream) {
    return new Promise(async (resolve, reject) => {
      try {
        if (stream && !this.#roomId) {
          if (stream instanceof MediaStream) {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          this.#stopAllStreams();
          return;
        }
        if (!stream) return;

        if (myStreams.has(type)) {
          throw new Error("Stream of same type already running");
        }

        let streamToShare = null;

        if (typeof stream !== "object" && !(stream instanceof MediaStream)) {
          throw new Error("Invalid stream");
        } else if (stream instanceof MediaStream) {
          streamToShare = stream;
        } else {
          if (type === SCREEN) {
            streamToShare = await navigator.mediaDevices.getDisplayMedia(
              stream
            );
          } else {
            streamToShare = await navigator.mediaDevices.getUserMedia(stream);
          }
        }
        myStreams.set(type, streamToShare);
        this.shareStream(type);
        resolve(streamToShare);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * @param {MediaStream} stream stream to send to other users in room
   * @param {StreamType | symbol} type type of stream being sent
   * @param {string?} to specific socket id to create peer connection for
   * @returns {Peer}
   */
  shareStream(type) {
    return new Promise(async (resolve, reject) => {
      if (!myStreams.get(type)) throw new Error("start stream before sharing");
      const stream = myStreams.get(type);
      const usersInRoom = await this.#getUsersInRoom();
      if (usersInRoom === null) return;
      for (const user of usersInRoom) {
        const connection = this.connections.get(user);
        if (!connection) {
          this.#createPeerConnection(user, {
            streams: [stream],
          });
          continue;
        }
        stream.getTracks().forEach((track) => {
          connection.peer.addTrack(track, stream);
        });
        connection.peer
          .createOffer()
          .then((offer) => {
            return connection.peer.setLocalDescription(offer);
          })
          .then(() => {
            this.socket.emit("peer:offer", {
              socketId: user,
              offer: connection.peer.localDescription,
              streamTypes: this.#myStreamsSendFormat(),
            });
          });
      }
      resolve(this);
    });
  }

  stopMicrophone() {
    this.stopStream(MICROPHONE);
  }

  stopCamera() {
    this.stopStream(CAMERA);
  }

  stopScreen() {
    this.stopStream(SCREEN);
  }

  stopStream(type) {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = myStreams.get(type);
        if (!stream) return;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.enabled = false;
          track.stop();
        });
        myStreams.delete(type);
        for (const [socketId, { peer, streams, types }] of this.connections) {
          peer.getSenders().forEach((sender) => {
            if (!tracks.includes(sender.track)) return;
            peer.removeTrack(sender);
          });

          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          this.socket.emit("peer:offer", {
            socketId,
            offer,
            streamTypes: this.#myStreamsSendFormat(),
          });
          if (myStreams.size === 0 && streams.size === 0) {
            peer.close();
            this.connections.delete(socketId);
          }
        }
        resolve(this);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * users in current room excluding yourself
   * @returns {Promise<string[] | null>}
   */
  #getUsersInRoom() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.socket.emitWithAck("peer:usersInRoom"));
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * @param {string} socketId socket id to connect to
   * @param {{streams?: MediaStream[], offer?: RTCSessionDescription, streamTypes?: {[streamId: string], string}}} options options vary depending on direction
   * @returns {this} this
   */
  async #createPeerConnection(socketId, options) {
    if (!socketId) throw new Error("no 'socketId' provided");
    if (!this.#roomId) throw new Error("peer has not joined a room");
    if (this.connections.has(socketId)) return this.connections.get(socketId);

    let sentResponse = false;

    const peer = this.#setPeer(socketId);
    const connection = this.connections.get(socketId);

    if (options.streamTypes) {
      connection.types = options.streamTypes;
    }

    if (options.streams) {
      for (const stream of options.streams) {
        stream.getTracks().forEach((track) => {
          peer.addTrack(track, stream);
        });
      }
    }

    peer.addEventListener("track", (event) => {
      for (const stream of event.streams) {
        connection.streams.set(stream, connection.types[stream.id]);
      }
      this.#cb("receivingChanged", { socketId, streams: this.streams });
    });

    peer.addEventListener("icecandidate", async (event) => {
      if (event.candidate) {
        this.socket.emit("peer:iceCandidate", {
          candidate: event.candidate,
        });
        if (sentResponse) return;
        sentResponse = true;
        if (peer.localDescription && !peer.remoteDescription) {
          this.socket.emit("peer:offer", {
            socketId,
            offer: peer.localDescription,
            streamTypes: this.#myStreamsSendFormat(),
          });
        }
        if (peer.localDescription && peer.remoteDescription) {
          this.#cb("receivingChanged", { socketId, streams: this.streams });
          this.socket.emit("peer:answer", {
            socketId,
            answer: peer.localDescription,
            streamTypes: this.#myStreamsSendFormat(),
          });
        }
      }
    });

    peer.addEventListener("connectionstatechange", (event) => {
      if (
        peer.connectionState === "closed" ||
        peer.connectionState === "disconnected" ||
        peer.connectionState === "failed"
      ) {
        peer.close();
        this.connections.get(socketId).peer = null;
        this.#cb("receivingChanged", { socketId, streams: this.streams });
      }
    });

    if (!options.offer) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
    } else {
      await peer.setRemoteDescription(options.offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
    }

    return this;
  }

  /**
   *
   * @param {string} id
   * @returns {RTCPeerConnection}
   */
  #setPeer(id) {
    if (this.connections.has(id)) {
      return this.connections.get(id).peer;
    } else {
      const obj = {
        peer: new RTCPeerConnection(configuration),
        streams: new Map(),
        types: {},
      };
      this.connections.set(id, obj);
    }
    return this.connections.get(id).peer;
  }

  #forAllIncomingTracks(func) {
    if (typeof func !== "function") return null;
    const s = this.streams;
    for (const socketId in s) {
      for (const trackType in s[socketId]) {
        const stream = s[socketId][trackType];
        stream.getTracks().forEach((track) => {
          func({ type: trackType, track: track, socketId });
        });
      }
    }
    return true;
  }

  #forAllMyTracks(func) {
    if (typeof func !== "function") return null;
    for (const [type, stream] of this.myStreams) {
      stream.getTracks().forEach((track) => {
        func({ stream, track, type });
      });
    }
  }

  #forAllConnections(func) {
    if (typeof func !== "function") return null;
    for (const [socketId, { peer, streams, types }] of this.connections) {
      func({ socketId, peer, streams, types });
    }
  }

  /**
   * gets streams from connections
   * @returns {IncomingStreams}
   */
  #getStreams() {
    const obj = {};
    for (const [socketId, { peer, streams }] of this.connections) {
      obj[socketId] = {};
      for (const [stream, type] of streams) {
        obj[socketId][type] = stream;
      }
    }
    return obj;
  }

  /**
   * @returns {{[streamId: string]: [streamType: string]}}
   */
  #myStreamsSendFormat() {
    const obj = {};
    for (const [type, stream] of myStreams) {
      obj[stream.id] = type;
    }
    return obj;
  }

  #stopAllStreams() {
    this.#forAllMyTracks(({ type, track, stream }) => {
      track.enabled = false;
      track.stop();
      stream.removeTrack(track);
    });
    this.myStreams.clear();
  }

  #closeAllConnections() {
    this.#forAllConnections(({ peer }) => {
      peer.close();
    });
    this.connections.clear();
  }

  #setup() {
    if (!this.socket) throw new Error("no socket provided, set 'socket'");
    const socket = this.socket;

    socket.on("peer:me", (socketId) => {
      this.#socketId = socketId;
      this.#cb("ready", this);
    });

    socket.on("connect_error", (event) => {
      if (event.message === "unauthorized event") {
        this.#cb("connectionError", setAuthToken);
        console.warn("socket unauthorized provide auth token");
        return;
      }

      function setAuthToken(token) {
        socket.auth.token = token;
        socket.connect();
      }
    });

    socket.on("disconnect", () => {
      this.#closeAllConnections();
      this.connections.clear();
    });

    socket.on("peer:usersOnline", (data) => {
      if (!this.#privateRoomId) {
        let inRoom = null;
        for (const roomId in data.groups) {
          if (data.groups[roomId].includes(this.#socketId)) inRoom = roomId;
        }
        if ((this.#roomId && !inRoom) || this.#roomId !== inRoom) {
          this.#roomId = inRoom;
          for (const [type, stream] of this.myStreams) {
            this.#stopAllStreams();
            this.#closeAllConnections();
          }
        }
      }

      // remove all created peers that are no longer in current room
      const currentRoomMembers = (data.groups[this.#roomId] || []).filter(
        (id) => id != this.#socketId
      );
      let streamsModified = false;
      this.#forAllIncomingTracks(({ track, socketId }) => {
        if (currentRoomMembers.includes(socketId)) return;
        track.stop();
        streamsModified = true;
      });
      this.connections.forEach((value, socketId) => {
        if (!currentRoomMembers.includes(socketId)) {
          value.peer.close();
          this.connections.delete(socketId);
        }
      });
      if (streamsModified)
        this.#cb("receivingChanged", { socketId: null, streams: this.streams });
      if (currentRoomMembers && myStreams.size !== 0) {
        // send to all that do not have a connection
        const connectedSockets = Array.from(this.connections.keys());
        currentRoomMembers.forEach((id) => {
          if (connectedSockets.includes(id)) return;
          this.#createPeerConnection(id, {
            streams: Array.from(myStreams.values()),
          });
        });
      }
      this.#members = data;
      this.#cb("usersChanged", data);
    });

    socket.on("peer:iceCandidate", (data) => {
      const connection = this.connections.get(data.socketId);
      if (!connection) return;
      const peer = connection.peer;
      if (!peer) return;
      if (!peer.currentRemoteDescription) return;
      peer.addIceCandidate(data.candidate);
    });

    socket.on("peer:callUser", ({ roomId, username, socketId }) => {
      this.#cb(
        "callInvite",
        { username, socketId, roomId },
        () => {
          this.#privateRoomId = roomId;
          this.joinRoom(roomId);
        },
        () => {
          this.#privateRoomId = null;
          socket.emit("peer:rejectCall", socketId);
        }
      );
    });

    socket.on("peer:rejectCall", (socketId) => {
      this.#cb("callRejected", socketId);
      this.leaveRoom();
    });

    socket.on("peer:offer", async (data) => {
      const { socketId, offer, streamTypes } = data;
      if (this.connections.has(socketId)) {
        const connection = this.connections.get(socketId);
        connection.types = streamTypes;
        const types = Object.values(connection.types);
        let streamsRemoved = false;
        for (const [stream, type] of connection.streams) {
          if (types.includes(type)) continue;
          connection.streams.delete(stream);
          streamsRemoved = true;
        }
        this.#cb("receivingChanged", { socketId, streams: this.streams });
        if (!types.length && !myStreams.size) {
          connection.peer.close();
          this.connections.delete(socketId);
          return;
        }
        const peer = connection.peer;
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit("peer:answer", {
          socketId,
          answer: answer,
          streamTypes: this.#myStreamsSendFormat(),
        });
        return;
      } else {
        this.#createPeerConnection(socketId, {
          offer,
          streamTypes: streamTypes,
        });
      }
    });

    socket.on("peer:answer", async (data) => {
      const { answer, socketId, streamTypes } = data;
      const connection = this.connections.get(socketId);
      connection.types = streamTypes;
      const peer = connection.peer;
      try {
        await peer.setRemoteDescription(answer);
      } catch (e) {
        console.error(e);
      }
    });
  }

  /**
   *
   * @param {EventListenerType} type
   * @param  {...any} params
   */
  #cb(type, ...params) {
    const funcName = "on" + type[0].toUpperCase() + type.slice(1);
    if (typeof this[funcName] === "function") {
      this[funcName](...params);
    }
    if (type in this.#eventListeners) {
      for (const func of this.#eventListeners[type]) {
        if (typeof func !== "function") continue;
        func(...params);
      }
    }
  }
}
