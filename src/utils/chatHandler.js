const url = import.meta.env.VITE_CHAT_SERVER_ORIGIN;

export function loadChat({ teamUid, teamName }) {
  return fetch(url + "/loadTeamChat", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      teamUID: teamUid,
      teamName,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function sendChat({ teamUid, teamName, message }) {
  return fetch(url + "/createTeamChat", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      teamUID: teamUid,
      teamName,
      message,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function editChat({ chatUid, teamUid, teamName, message }) {
  return fetch(url + "/editTeamChat", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      teamUID: teamUid,
      teamName,
      chatUID: chatUid,
      message,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function deleteChat({ chatUid, teamUid, teamName }) {
  return fetch(url + "/deleteTeamChat", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      teamUID: teamUid,
      teamName,
      chatUID: chatUid,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}
