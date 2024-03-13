import React, { useState, useEffect } from 'react';
import Message from './Message';
import Utils from './Utils';
import { Phone, Calendar, UserRoundPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Textarea from './Textarea';
import './GroupDashboard.css';

function GroupDashboard() {
  const [messages, setMessages] = useState([
    {
      name: 'Bob Johnson',
      message: 'Hey team, remember that meeting today at 10?',
      time: '9:00 AM',
      avatar: 'src\\assets\\img\\pexels-justin-shaifer-1222271.jpg',
    },
    {
      name: 'Alice Smith',
      message:
        'Oh shoot, I totally forgot! Can we reschedule? I have a dentist appointment.',
      time: '9:05 AM',
      avatar: 'src\\assets\\img\\pexels-andrea-piacquadio-774909.jpg',
    },
    {
      name: 'Charlie Brown',
      message:
        "Don't worry, I'll bring a drill and some pliers. We'll multitask!",
      time: '9:07 AM',
      avatar: 'src\\assets\\img\\pexels-nitin-khajotia-1516680.jpg',
    },
    {
      name: 'Alice Smith',
      message: "I'm in! Let's do it!",
      time: '9:08 AM',
      avatar: 'src\\assets\\img\\pexels-andrea-piacquadio-774909.jpg',
    },
  ]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="md:w-3/4 xl:w-7/12 flex justify-center px-2">
      <div className="content-body flex w-full">
        <div className="chat xl:me-3 w-full ">
          <div className="chatbox border border-input rounded-lg px-4 xl:px-8 py-6 gap-4 mb-3">
            <div className="chatbox--header flex items-center mb-4">
              <h1 className="font-semibold text-xl sm:text-2xl xl:text-3xl me-auto">
                forgetful-dentists
              </h1>
              <div className="icons flex gap-4 p-3">
                <Phone size={24} />
                <UserRoundPlus size={24} />
                <Dialog>
                  <DialogTrigger>
                    <Calendar size={24} className="xl:hidden" />
                  </DialogTrigger>
                  <DialogContent className="w-fit p-12 max-h-[80vh] overflow-y-auto">
                    <Utils />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="chat-messages overflow-y-auto h-[50vh] custom-scrollbar">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  name={message.name}
                  message={message.message}
                  time={message.time}
                  avatar={message.avatar}
                />
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Type your message here."
            className="resize-none"
            addMessage={addMessage}
          />
        </div>
        <div className="utils max-w-min hidden xl:block">
          <Utils />
        </div>
      </div>
    </div>
  );
}

export default GroupDashboard;
