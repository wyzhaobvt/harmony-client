import globals, { peer, socket } from "./globals";

const url = import.meta.env.VITE_SERVER_ORIGIN;

export function checkLoggedIn() {
  return localStorage.getItem("harmony_email");
}

/**
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function login(email, password) {
  try {
    const response = await fetch(url + "/api/users/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      globals.email = email;
      localStorage.setItem("harmony_email", email);
      socket.connect()
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
}

/**
 * 
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function register(username, email, password) {
  try {
    const response = await fetch(url + "/api/users/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      globals.email = email;
      localStorage.setItem("harmony_email", email);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
}

/**
 * 
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function logout() {
  try {
    const response = await fetch(url + "/api/users/logoutUser", {
      method: "POST",
      credentials: "include",
    })

    const result = await response.json();

    if (result.success) {
      globals.email = null;
      localStorage.removeItem("harmony_email");
      peer.authToken = null;
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
}

export const getUser = async () => {
  try {
    const response = await fetch(url + "/api/database/getUser", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
};

export const updateUser = async (username, email) => {
  try {
    const response = await fetch(url + "/api/database/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, email }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
};

export const uploadAvatar = async (image, avatarLink) => {
  try {
    const response = await fetch(url + "/api/database/uploadAvatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ image, avatarLink }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
};

export const deleteAvatar = async (avatarLink) => {
  try {
    const response = await fetch(url + "/api/database/deleteAvatar", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ avatarLink }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
}

export function addToTeam({ teamId, teamName, targetEmail }) {
  return fetch(url + "/api/database/addToTeam", {
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
  }).then((data) => data.json());
}
