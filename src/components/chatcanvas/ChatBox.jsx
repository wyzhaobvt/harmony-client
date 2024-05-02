import { useEffect, useRef, useState } from "react";
import Textarea from "./TextareaChatCanvas";
import { ProfilePicture } from "../ProfilePicture";
import {
  deleteMessage,
  editChatMessage,
  editMessage,
  fetchChatHistory,
  handleSaveMessage,
  listenForChatMessages,
  sendMessage,
  setupDeleteMessageListener,
} from "../../utils/userToUserChatHandler";


const ChatBox = ({ setindividualChatOpen, selectedFriend }) => {
  const individualChatClickHandler = () => {
    setindividualChatOpen(false);
  };
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const chatListRef = useRef(null); // Ref for the chat list
  const [isEditing, setIsEditing] = useState(
    Array(chatMessage.length).fill(false)
  );
  const [editedMessage, setEditMessage] = useState("");

  useEffect(() => {
    fetchChatHistory(
      selectedFriend,
      setUsername,
      setUserId,
      setChatMessage,
      setIsEditing
    );
  }, [selectedFriend]);

  useEffect(() => {
    const cleanup = listenForChatMessages(
      username,
      selectedFriend,
      setChatMessage,
      setIsEditing
    );

    // Clean up the event listener when the component unmounts
    return cleanup;
  }, [username, selectedFriend, setChatMessage]);
 

  useEffect(() => {
    editChatMessage(chatMessage, setChatMessage);
  }, [chatMessage]);

  useEffect(() => {
    const cleanupDeleteMessageListener = setupDeleteMessageListener(
      chatMessage,
      setChatMessage,
      setIsEditing
    );
    return cleanupDeleteMessageListener;
  }, [chatMessage]);

  useEffect(() => {
    // Scroll to bottom when chatMessage state changes
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatMessage]);

  const handleChangeMessage = (e) => {
    setEditMessage(e.target.value);
  };
  const handleCancel = (index) => {
    setIsEditing((prevState) =>
      prevState.map((value, i) => (i === index ? false : value))
    );
  };

  const handleSave = async (index) => {
    await handleSaveMessage(
      index,
      chatMessage,
      editedMessage,
      username,
      selectedFriend,
      setChatMessage,
      setIsEditing,
      setEditMessage
    );
  };

  const handleEdit = (index) => {
    editMessage(index, chatMessage, setIsEditing, setEditMessage);
  };

  const handleSendMessage = async (message) => {
    await sendMessage(
      username,
      selectedFriend,
      message,
      setChatMessage,
      setIsEditing
    );
  };

  const handleDelete = async (index) => {
    try {
      await deleteMessage(
        index,
        chatMessage,
        setChatMessage,
        username,
        selectedFriend,
        setIsEditing
      );
    } catch (error) {
      console.log("Delete message: " + error);
    }
  };
  return (
    <>
      <div className="flex flex-col chat-canvas  w-[75vw] md:w-[350px] dark:bg-black text-primary pb-2">
        <div className=" border-b p-1 md:p-3 flex items-center justify-between">
          <div className="flex items-center ">
            {/* User avatar */}
            <ProfilePicture image={selectedFriend.profileURL} />
            {/* Username */}
            <h1 className="text-xl ml-3 break-all">
              {selectedFriend.username}
            </h1>
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
            handleSendMessage={handleSendMessage}
            peerUsername={selectedFriend}
            username={username}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBox;
