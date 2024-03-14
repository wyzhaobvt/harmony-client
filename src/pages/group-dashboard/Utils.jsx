import React, { useState, useEffect } from 'react';
import Event from './Event';
import { Calendar as CustomCalendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea as TextareaCN } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function Utils() {
  const monthNames = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];

  const [date, setDate] = React.useState(new Date());

  const [eventForm, setEventForm] = useState({
    name: '',
    time: '',
    description: '',
  });

  const handleEventChange = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, eventForm]);
    setEventForm({ name: '', time: '', description: '' }); // Reset form
  };

  const [events, setEvents] = useState([
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
  ]);

  return (
    <>
      <CustomCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-input h-fit mb-3"
      />
      <div className="day-breakdown rounded-md border border-input p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-semibold text-3xl">
            {monthNames[date.getMonth()]} {date.getDate()}
          </h1>
          <Dialog>
            <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-1 px-4 rounded">
              Add
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
                <DialogDescription>Add a new event.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                <Input
                  id="name"
                  placeholder="Event name"
                  value={eventForm.name}
                  onChange={handleEventChange}
                />
                <Input
                  id="time"
                  placeholder="Date and time"
                  value={eventForm.time}
                  onChange={handleEventChange}
                />
                <TextareaCN
                  id="description"
                  placeholder="Event Description"
                  value={eventForm.description}
                  onChange={handleEventChange}
                />
                <DialogFooter>
                  <Button type="submit">Add event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="event-list">
          {events.map((event, index) => (
            <Event key={index} name={event.name} time={event.time} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Utils;
