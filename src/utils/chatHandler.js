const url = import.meta.env.VITE_SERVER_ORIGIN;

export function loadChat({ teamUid, teamName }) {
  if (!teamUid || !teamName) throw new Error("Missing Property")
  return fetch(url + "/api/chat/load", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamUID: teamUid,
      teamName,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function sendChat({ teamUid, teamName, message, isFile, chatUID}) {
  if (!teamUid || !teamName || !message) throw new Error("Missing Property")
  console.log("send Chat fn", message, isFile)
  return fetch(url + "/api/chat/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamUID: teamUid,
      teamName,
      message,
      isFile
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function editChat({ chatUid, teamUid, teamName, message }) {
  if (!teamUid || !teamName || !chatUid || !message) throw new Error("Missing Property")
  return fetch(url + "/api/chat/edit", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamUID: teamUid,
      teamName,
      chatUID: chatUid,
      message,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function deleteChat({ chatUid, teamUid, teamName }) {
  if (!teamUid || !teamName || !chatUid) throw new Error("Missing Property")
  return fetch(url + "/api/chat/delete", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamUID: teamUid,
      teamName,
      chatUID: chatUid,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}
