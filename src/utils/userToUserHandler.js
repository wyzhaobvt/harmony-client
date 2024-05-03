const url = import.meta.env.VITE_SERVER_ORIGIN;

export async function loadFriendsList() {
  try {
    const response = await fetch(`${url}/api/database/loadFriendsList`, {
      method: "GET",
      credentials: "include"
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    };
  }
}

export async function deleteFriend(targetEmail) {
  try {
    const response = await fetch(`${url}/api/database/removeFriend`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ targetEmail })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: `An error occurred: ${error.message}`
    };
  }
}
