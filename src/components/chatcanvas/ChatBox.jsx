import { useEffect, useRef, useState } from "react";
import Textarea from "./TextareaChatCanvas";
import axios from "axios";
import { getUser } from "../../utils/authHandler";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SIGNALING_SERVER_ORIGIN, {
    withCredentials: true
});
socket.on("connect", () => {
  console.log("Client - Socket connection established:", socket.connected);
});
socket.on("error", (error) => {
  console.error("Client - Socket connection error:", error);
});

const ChatBox = ({ setindividualChatOpen, selectedFriend }) => {
  const individualChatClickHandler = () => {
    setindividualChatOpen(false);
  };
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  // const [peerUsername, setPeerUsername] = useState("testuser2@email.com");
  const [chatMessage, setChatMessage] = useState([]);
  const chatListRef = useRef(null); // Ref for the chat list
  useEffect(() => {
    const fetchChatHistory = async () => {
      let fetchusername = await getUser();
      console.log(fetchusername);
      localStorage.setItem("username", fetchusername.data[0].username);
      const username = localStorage.getItem("username");
      setUsername(username);
      setUserId(fetchusername.data[0].id);
      socket.emit("set username", username);
      try {
        // Make API call to fetch chat history
        const response = await axios.get(
          "http://localhost:5000/api/peerchat/load",
          {
            params: {
              username: username,
              peerUsername: selectedFriend,
            },
            withCredentials: true, // Send cookies with the request if needed
          }
        );
        // Update state with chat messages
        const messages = response.data.data[0];
        setChatMessage(messages);
        setIsEditing(Array(messages.length).fill(false));
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [selectedFriend]);

  useEffect(() => {
    socket.on("chat message", async (message) => {
      console.log("received message:", message);
      try {
        // Fetch the latest message from the server
        const chatHistoryLatestResponse = await axios.get(
          "http://localhost:5000/api/peerchat/loadlatest",
          {
            params: {
              username: username,
              peerUsername: selectedFriend,
            },
            withCredentials: true,
          }
        );
        const latestMessage = chatHistoryLatestResponse.data.data[0][0];
        console.log("Latest message:", latestMessage);

        // Update the chat messages state with the latest message
        setChatMessage((prevChatMessage) => [
          ...prevChatMessage,
          latestMessage,
        ]);
      } catch (error) {
        console.log("Error updating message:", error);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("chat message");
    };
  }, [username, selectedFriend]); // Added dependencies to useEffect

  useEffect(() => {
    // Socket listener for edit message event
    socket.on("edit message", ({ messageId, message }) => {
      // Find the index of the message in the chatMessage state array
      const messageIndex = chatMessage.findIndex((msg) => msg.id === messageId);
      if (messageIndex !== -1) {
        // Create a copy of the chatMessage state array
        const updatedChatMessage = [...chatMessage];
        // Update the message content at the found index
        updatedChatMessage[messageIndex].message = message;
        // Update the chatMessage state with the updated array
        setChatMessage(updatedChatMessage);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("edit message");
    };
  }, [chatMessage]); // Add chatMessage as a dependency to the useEffect hook

  // Add this useEffect hook to listen for delete message events
  useEffect(() => {
    socket.on("delete message", ({ messageId }) => {
      // Find the index of the deleted message in the chatMessage state array
      const messageIndex = chatMessage.findIndex((msg) => msg.id === messageId);
      console.log(chatMessage);
      console.log(messageIndex);
      if (messageIndex !== -1) {
        // Create a copy of the chatMessage state array
        const updatedChatMessage = [...chatMessage];
        // Remove the deleted message from the array
        updatedChatMessage.splice(messageIndex, 1);
        // Update the chatMessage state with the updated array
        setChatMessage(updatedChatMessage);
        console.log(chatMessage);
      }
    });
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("delete message");
    };
  }, [chatMessage]);

  useEffect(() => {
    // Scroll to bottom when chatMessage state changes
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatMessage]);

  const [isEditing, setIsEditing] = useState(
    Array(chatMessage.length).fill(false)
  );
  const [editedMessage, setEditMessage] = useState("");
  const handleChangeMessage = (e) => {
    setEditMessage(e.target.value);
  };
  const handleCancel = (index) => {
    setIsEditing((prevState) =>
      prevState.map((value, i) => (i === index ? false : value))
    );
  };
  const handleSave = async (index) => {
    try {
      await axios.put(
        "http://localhost:5000/api/peerchat/edit",
        {
          userChatId: chatMessage[index].id,
          message: editedMessage,
          userSender: username,
        },
        {
          withCredentials: true,
        }
      );
      setChatMessage((prevChatMessage) => {
        const updatedChatMessage = [...prevChatMessage];
        updatedChatMessage[index].message = editedMessage;
        return updatedChatMessage;
      });
      socket.emit("edit message", {
        recipient: selectedFriend,
        messageId: chatMessage[index].id,
        message: editedMessage,
      });

      // Reset isEditing state
      setIsEditing((prevState) =>
        prevState.map((value, i) => (i === index ? false : value))
      );
    } catch (error) {
      console.error("Error updating message:", error);
    }
    setEditMessage("");
  };
  useEffect(() => {
    // Initialize isEditing state dynamically based on chatMessage length
    setIsEditing(Array(chatMessage.length).fill(false));
  }, [chatMessage]);

  const handleEdit = (index) => {
    setIsEditing((prevState) =>
      prevState.map((value, i) => (i === index ? true : false))
    );
    setEditMessage(chatMessage[index].message);
  };
  const sendMessage = async (username, recipient, message) => {
    // Emit the "chat message" event with the message data

    try {
      const response = await axios.post(
        "http://localhost:5000/api/peerchat/send",
        {
          userSender: username,
          userReciever: recipient,
          message: message,
        },
        {
          withCredentials: true, // Send cookies with the request if needed
        }
      );
      if (response.status === 200) {
        console.log("Message sent successfully.");
        // After sending the message, fetch the updated chat messages from the database
        socket.emit("chat message", { recipient, message });
        const chatHistoryLatestResponse = await axios.get(
          "http://localhost:5000/api/peerchat/loadlatest",
          {
            params: {
              // username: "testuser2@email.com",
              // peerUsername: "testuser2@email.com",
              username: username,
              peerUsername: selectedFriend,
            },
            withCredentials: true, // Send cookies with the request if needed
          }
        );
        const latestMessage = chatHistoryLatestResponse.data.data[0][0];
        console.log(latestMessage);
        // Update the chat messages state with the fetched messages
        if (latestMessage) {
          setChatMessage((prevChatMessage) => [
            ...prevChatMessage,
            latestMessage,
          ]);
        }
      }
      console.log(chatMessage);
      // Log the message to the console
      console.log(`Message sent to ${recipient}: ${message}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleDelete = async (index, recipient, messageId) => {
    try {
      await axios.put(
        "http://localhost:5000/api/peerchat/delete",
        {
          userChatId: chatMessage[index].id,
          userSender: username,
        },
        {
          withCredentials: true,
        }
      );
      socket.emit("delete message", {
        recipient: selectedFriend,
        messageId: chatMessage[index].id,
      });
      const updatedChatMessage = [...chatMessage]; // Create a copy
      updatedChatMessage.splice(index, 1); // Remove the element
      setChatMessage(updatedChatMessage); // Update state
    } catch (error) {
      console.log("Delete message: " + error);
    }
  };

  return (
    <>
      <div className="flex flex-col chat-canvas  w-[75vw] md:w-[350px] dark:bg-black text-primary pb-2">
        <div className=" border-b p-1 md:p-3 flex items-center justify-between">
          <div className="flex items-center ">
            <img
              src="assets\\img\\pexels-andrea-piacquadio-774909.jpg"
              className="rounded-full w-10 h-10 object-cover flex-shrink-0 "
            ></img>

            <h1 className="text-xl ml-3">{selectedFriend}</h1>
          </div>
          <button className="me-3" onClick={individualChatClickHandler}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="mt-3 h-[75vh] scrollable-div ">
          <div
            className="flex flex-col chat-list h-4/5 overflow-auto "
            ref={chatListRef}
          >
            {chatMessage.map((message, index) => (
              <div
                className={`flex mb-2  flex-col ${
                  message.userSender === userId ? "from-me" : "from-them"
                }`}
                key={message.id}
              >
                {!isEditing[index] ? (
                  <>
                    <div
                      className={`m-0 p-2 rounded-md ${
                        message.userSender === userId
                          ? "from-me-message"
                          : "from-them-message"
                      }`}
                    >
                      {message.message.split("\n").map((line, index) => (
                        <p
                          key={index}
                          className={`p-0 message m-0 dark:from-them-dark`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    {message.userSender === userId ? (
                      <div
                        className={`flex text-sm ${
                          message.userSender === userId
                            ? "from-me-button"
                            : "from-them-button"
                        }`}
                      >
                        <button
                          onClick={() => handleEdit(index)}
                          className="mr-2"
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDelete(index)}>
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    <textarea
                      className="border resize-none focus:outline-none dark:bg-black text-primary"
                      value={editedMessage}
                      onChange={handleChangeMessage}
                    />
                    <div className="flex justify-between text-sm ">
                      <button onClick={() => handleSave(index)}>Save</button>
                      <button onClick={() => handleCancel(index)}>
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <Textarea
            sendMessage={sendMessage}
            peerUsername={selectedFriend}
            username={username}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBox;
