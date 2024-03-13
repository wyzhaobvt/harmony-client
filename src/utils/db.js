import globals from "./globals";

/**
 * Sends provided file to server
 * @param {File} file file to send to server
 */
export function uploadFile(file) {
  if (!file) throw new Error("No file was provided");
  const formData = new FormData();
  formData.append("file", file);

  fetch(serverUrl("/uploadFile"), {
    method: "POST",
    body: formData,
    credentials: "include",
  });
}

export function login({ email, password }) {
  return fetch(authUrl("/loginUser"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
}

export function register({ email, password }) {
  fetch(authUrl("registerUser"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
}

export function getPeerAuthToken(callback) {
  fetch(authUrl("/peer/authenticate"), {
    credentials: "include",
  }).then((data) => {
    data.json().then((data) => {
      if (!data.success) return;
      if (typeof callback === "function") callback(data.data);
    });
  });
}

export function addToTeam({ teamId, teamName, targetEmail }) {
  return fetch(teamUrl("/addToTeam"), {
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
  }).then(data=>data.json());
}

function serverUrl(path) {
  return new URL(path, import.meta.env.VITE_SERVER_ORIGIN).href;
}

function authUrl(path) {
  return new URL(path, import.meta.env.VITE_USER_AUTH_ORIGIN).href;
}

function teamUrl(path) {
  return new URL(path, import.meta.env.VITE_TEAM_SERVER_ORIGIN).href;
}
