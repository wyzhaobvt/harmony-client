import globals, { peer } from "./globals";

const url = import.meta.env.VITE_USER_AUTH_ORIGIN;

// Move to uploadFile to another file
export function checkLoggedIn() {
  return localStorage.getItem("harmony_email");
}

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

export async function login(email, password) {
  try {
    const response = await fetch(url + "/loginUser", {
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
    }

    return result;    
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    };
  }
}

export async function register(username, email, password) {
  try {
    const response = await fetch(url + "/registerUser", {
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
      message: `An error occurred: ${error.message}`
    };
  }
}

export async function logout() {
  try {
    const response = await fetch(url + "/logoutUser", {
      method: "POST",
      credentials: "include",
    })

    const result = await response.json();

    if (result.success) {
      globals.email = null;
      localStorage.removeItem("harmony_email");
      peer.authToken = null
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    };
  }
}

export const getUser = async () => {
  try {
    const response = await fetch(url + "/getUser", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    }
  }
}

export const updateUser = async (username, email) => {
  try {
    const response = await fetch(url + "/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ username, email })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    }
  }
}

export const uploadAvatar = async (image, avatarLink) => {
  try {
    const response = await fetch(url + "/uploadAvatar", {
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
      message: `An error occurred: ${error.message}`
    }
  }
}

export const deleteAvatar = async (avatarLink) => {
  try {
    const response = await fetch("http://localhost:5002/deleteAvatar", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ avatarLink })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    }
  }
}