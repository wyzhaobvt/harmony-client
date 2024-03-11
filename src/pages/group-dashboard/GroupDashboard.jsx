import React, { useState } from 'react';
import Message from './Message';
import Event from './Event';
import { Phone, Calendar, UserRoundPlus } from 'lucide-react';
import { Calendar as CustomCalendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Textarea from './Textarea';
import './GroupDashboard.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function GroupDashboard() {
  const [date, setDate] = React.useState(new Date());

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

  const events = [
    {
      name: 'Meeting',
      time: '10:00 AM',
    },
    {
      name: 'Bob’s Reminder',
      time: '11:30 AM',
    },
    {
      name: 'Lunch Break',
      time: '1:00 PM',
    },
    {
      name: 'Brainstorming Session',
      time: '2:30 PM',
    },
    {
      name: 'Charlie’s DIY Dentistry Workshop',
      time: '5:30 PM',
    },
  ];

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
                    <CustomCalendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border border-input h-fit mb-3"
                    />
                    <div className="day-breakdown rounded-md border border-input p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h1 className="font-semibold text-3xl">Today</h1>
                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-1 px-4 rounded">
                          Add
                        </button>
                      </div>
                      <div className="event-list">
                        {events.map((event, index) => (
                          <Event
                            key={index}
                            name={event.name}
                            time={event.time}
                          />
                        ))}
                      </div>
                    </div>
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
          <CustomCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-input h-fit mb-3"
          />
          <div className="day-breakdown rounded-md border border-input p-4">
            <div className="flex justify-between items-center mb-3">
              <h1 className="font-semibold text-3xl">Today</h1>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-1 px-4 rounded">
                Add
              </button>
            </div>
            <div className="event-list">
              {events.map((event, index) => (
                <Event key={index} name={event.name} time={event.time} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDashboard;
