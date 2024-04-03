import globals, { peer } from "./globals";

const url = import.meta.env.VITE_USER_AUTH_ORIGIN;

// Move to uploadFile to another file
/**
 * Sends provided file to server
 * @param {File} file file to send to server
 */
export function uploadFile(file) {
  if (!file) throw new Error("No file was provided");
  const formData = new FormData();
  formData.append("file", file);

  fetch(import.meta.env.VITE_SERVER_ORIGIN + "/uploadFile", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
}

export function login({ email, password }) {
  return fetch(url + "/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        globals.email = email;
        localStorage.setItem("harmony_email", email);
        getPeerAuthToken().then((token) => {
          peer.authToken = token;
        });
      }
      return data;
    })
    .catch((err) => {
      return {
        success: false,
        message: "An error occurred: " + err,
      };
    });
}

export function register({ email, password }) {
  fetch(url + "/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        globals.email = email;
        localStorage.setItem("harmony_email", email);
        getPeerAuthToken().then((token) => {
          peer.authToken = token;
        });
      }
      return data;
    })
    .catch((err) => {
      return {
        success: false,
        message: "An error occurred: " + err,
      };
    });
}

export function logout() {
  fetch(url + "/logoutUser", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        globals.email = null;
        localStorage.removeItem("harmony_email");
        peer.authToken = null;
      }
      return data;
    })
    .catch((err) => {
      return {
        success: false,
        message: "An error occurred: " + err,
      };
    });
}

export function getPeerAuthToken(callback) {
  return fetch(url + "/peer/authenticate", {
    credentials: "include",
  })
    .then((res) => {
      if (res.status !== 200) throw res.statusText;
      res.json().then((data) => {
        if (!data.success) return data.data;
        localStorage.setItem("harmony_peer_token", data.data);
        if (typeof callback === "function") callback(data.data);
      });
    })
    .catch((err) => {
      return {
        success: false,
        message: "An error occurred: " + err,
      };
    });
}
