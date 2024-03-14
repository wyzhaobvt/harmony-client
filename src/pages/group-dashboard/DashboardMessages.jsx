import React, { useState, useEffect } from 'react';
import { Phone, Calendar, UserRoundPlus } from 'lucide-react';
import DashboardCalendar from './DashboardCalendar'
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
import Message from './Message';

function DashboardMessages({date, setDate, messages, setMessages}) {  

   
    
      const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

    return (
        
        <div className="chat xl:me-3 w-full">
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
                  <DialogContent className="w-fit p-12 max-h-[80vh] overflow-y-auto xl:hidden">
                    <div className='block xl:hidden'><DashboardCalendar date={date} setDate={setDate} /></div>
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

    );
}

export default DashboardMessages;






