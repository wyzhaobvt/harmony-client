import React, { useState, useEffect, useRef } from 'react';
import { Phone, Calendar, UserRoundPlus, MoreHorizontal, X } from 'lucide-react';
import DashboardCalendar from './DashboardCalendar'
import GroupMembers from './GroupMembers';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import './GroupDashboard.css';
import { Send, SmilePlus, Paperclip } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteChat, editChat, loadChat, sendChat } from '../../utils/chatHandler';
import globals from '../../utils/globals';

function MessageText({
  message,
  messageLines,
  editing,
  setEditing,
  onMessageSend,
}) {
  function updateMessage({ text, setText }) {
    if (text !== message) {
      if (typeof onMessageSend === "function")
        onMessageSend({ newMessage: text, oldMessage: message, messageLines });
    }
    setEditing(false);
  }
  return (
    <>
      {editing ? (
        <div className="relative">
          <Textarea
            value={message}
            placeholder="Type your message here."
            className="resize-none"
            onMessageSend={updateMessage}
          />
          <Button
            className="text-zinc-700 absolute top-1 right-1 w-6 h-6 p-0"
            variant="ghost"
            onClick={() => setEditing(false)}
          >
            <X></X>
          </Button>
        </div>
      ) : (
        messageLines
      )}
    </>
  );
}

function Message({ teamUid, chatUid, name, message, time, avatar, edited, updateMessages }) {
  const [editing, setEditing] = useState(false)
  const [messageText, setMessageText] = useState(message)
  const team = globals.teamsCache[teamUid]
  // Split the message by newline characters and map each line to a JSX element
  const messageLines = messageText.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  
  const formattedDate = new Date(time.replace("Z", "-01:00"))
    .toLocaleString()
    .replace(
      /(\d+)\/(\d+)\/\d\d(\d+), (\d+):(\d+):\d+ ([AP]M)/,
      "$1/$2/$3 $4:$5 $6"
    );

  function handleMessageSend({oldMessage, newMessage}) {
    if (oldMessage === newMessage) return
    editChat({chatUid, teamUid, message: newMessage, teamName: team.name}).then(()=>{
      updateMessages()
    })
    setMessageText(newMessage)
  }

  function handleDeleteClick() {
    deleteChat({chatUid, teamUid, teamName: team.name}).then(()=>{
      updateMessages();
    })
  }

  return (
    <div className="message border border-input rounded-md flex p-2 mb-2">
      <img
        src={avatar || "https://via.placeholder.com/40"}
        alt=""
        className="rounded-full w-10 h-10 object-cover me-4 flex-shrink-0 cursor-pointer"
      />
      <div className="message-body grow">
        <h1 className="font-semibold text-sm me-auto">{name}</h1>
        <div className="text-sm">
          <MessageText
            message={messageText}
            messageLines={messageLines}
            editing={editing}
            setEditing={setEditing}
            onMessageSend={handleMessageSend}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {formattedDate}
          {!!edited && <span>&nbsp;&nbsp;(edited)</span>}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto w-6 min-w-6 h-6 p-0" variant="outline">
            <MoreHorizontal className="text-zinc-700 w-5/6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditing(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Textarea({ value, placeholder, className, onMessageSend }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState(value || "");
  const emojiPickerRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
    setShowEmojiPicker(false)
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerRef]);

  const sendMessage = async () => {
    if (typeof onMessageSend !== "function") return
    onMessageSend({text, setText})
  }

  return (
    <div className="relative w-full flex flex-col">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        placeholder={placeholder}
        className={`${className} w-full min-h-32 p-2 pb-12 bg-background border border-input rounded-lg resize-none focus:outline-none focus:border-primary transition-all duration-200 ease-in-out pr-20`}
      />
      <div className="icons">
        <div className="absolute left-3 bottom-3 transform space-x-2 flex items-center">
          <div className='cursor-pointer' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <SmilePlus size={24} />
          </div >
          <Paperclip className='cursor-pointer' size={24} />
        </div>
        <div className="absolute right-3 bottom-3 transform space-x-2 flex items-center">
          <Send size={24} className='cursor-pointer' onClick={sendMessage} />
        </div>
      </div>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute left-3 bottom-14">
          <Picker data={data} theme="light" onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}

function DashboardMessages({date, setDate, messages, setMessages, groupName, messagesContainer, onMessagesScroll}) {
      const {group, uid} = useParams()
      const navigate = useNavigate()
      const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };
      const team = globals.teamsCache[uid]

      function updateMessages() {
        loadChat({teamUid: uid, teamName: team.name}).then(data=>{setMessages(data.data)})
      }

      const sendMessage = async ({text, setText}) => {
        if (!text) return;
        sendChat({teamUid: uid, teamName: team.name, message: text}).then(()=>{
          updateMessages()
        })
    
        addMessage({
          name: globals.email,
          message: text,
          sentAt: new Date(new Date() + "-06:00").toISOString(),
          profileURL: "",
        });
        setText('');
      };

    return (
        
        <div className="chat xl:me-3 w-full h-full flex flex-col">
          <div className="chatbox border border-input rounded-lg px-4 xl:px-8 py-6 gap-4 mb-3 grow flex flex-col">
            <div className="chatbox--header flex items-center">
                <h1 className="font-semibold text-xl sm:text-2xl xl:text-3xl me-auto">
                  <GroupMembers groupName={groupName} groupUid={uid}/>
                </h1>
              <div className="icons flex gap-4 p-3">
                <Phone size={24} className='cursor-pointer' onClick={()=>navigate(`/video/${group}/${uid}`)}/>
                <UserRoundPlus className='cursor-pointer' size={24} />
                <Dialog>
                  <DialogTrigger>
                    <Calendar size={24} className="xl:hidden cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="w-fit p-12 max-h-[80vh] overflow-y-auto xl:hidden">
                    <div className='block xl:hidden'><DashboardCalendar groupName={groupName} date={date} setDate={setDate} /></div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="chat-messages overflow-y-auto h-[50vh] custom-scrollbar grow">
              {messages.length ? messages.map((message, index) => (
                <Message
                  key={message.uid+Date.now()}
                  teamUid={uid}
                  updateMessages={updateMessages}
                  chatUid={message.uid}
                  name={message.sender}
                  message={message.message}
                  time={message.sentAt}
                  avatar={message.profileURL}
                  edited={message.edited}
                />
              )): "No Messages"}
            </div>
          </div>
          <Textarea
            placeholder="Type your message here."
            className="resize-none"
            onMessageSend={sendMessage}
          />
        </div>
    );
}

export default DashboardMessages;






