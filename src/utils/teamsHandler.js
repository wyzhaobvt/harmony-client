const url = import.meta.env.VITE_TEAM_SERVER_ORIGIN;

export function createTeam({ teamName }) {
  if (!teamName) throw new Error("Missing Property")
  return fetch(url + "/createTeam", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamName,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function addToTeam({ teamId, teamName, targetEmail }) {
  if (!teamName || !teamId || !targetEmail) throw new Error("Missing Property")
  return fetch(url + "/addToTeam", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetEmail: targetEmail,
      teamID: teamId,
      teamName: teamName,
    }),
  })
    .then((data) => data.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function loadTeams() {
  return fetch(url + "/loadJoinedTeams", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function removeTeamLink({ teamUid, teamName, targetEmail }) {
  if (!teamName || !teamUid) throw new Error("Missing Property")
  return fetch(url + "/removeTeamLink", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamUID: teamUid,
      teamName,
      targetEmail
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function leaveTeam({ teamUid, teamName }) {
  if (!teamName || !teamUid) throw new Error("Missing Property")
  return fetch(url + "/leaveTeam", {
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

export function updateTeamName({ teamUid, teamNameOld, teamNameNew }) {
  if (!teamUid || !teamNameOld || !teamNameNew ) throw new Error("Missing Property")
  return fetch(url + "/updateTeamName", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamUID: teamUid,
      teamNameOld,
      teamNameNew,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function deleteTeam({ teamUid, teamName }) {
  if (!teamName || !teamUid) throw new Error("Missing Property")
  return fetch(url + "/deleteTeam", {
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