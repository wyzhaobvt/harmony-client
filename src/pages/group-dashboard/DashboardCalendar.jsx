import React from 'react'
import {useState, useEffect} from 'react'
import { Calendar as CustomCalendar } from '@/components/ui/calendar';
import './GroupDashboard.css';
import axios from 'axios';
import { DateTime } from 'luxon'
import { X } from 'lucide-react';
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


function Event({ name, time, date, description, onDelete}) {
  return (
    <div className="event flex items-center justify-between border-b hover:bg-secondary py-2 pe-2 group">
      <div className="event-details">
        <h2 className="font-semibold text-sm">{name}</h2>
        <p className="text-sm">{date} | {time}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div
        className="delete-icon opacity-0 group-hover:opacity-100"
        onClick={onDelete}
      >
        <X />
      </div>
    </div>
  );
}

function DashboardCalendar({date, setDate, groupName}) {

  const [events, setEvents] = useState([])
  
  const [eventForm, setEventForm] = useState({
    calendar: groupName,
    event: {name: '', date: '', startTime: '', endTime: '', description: ''},
  });
  console.log(eventForm);

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

  const handleEventChange = (e) => {
    setEventForm({
      ...eventForm,
      event: {
      ...eventForm.event,
      [e.target.id]: e.target.value,
    }})
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setEvents([...events, eventForm]);
    try {
      // Make a POST request to your Express endpoint
      const response = await axios.post('http://localhost:5000/api/calendar/createevent', eventForm);
      console.log('Event added:', response.data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error adding event:', error);
      throw error; // Throw the error if needed
    }
    setEventForm({   name: '', date: '', startTime: '', endTime: '', description: '' }); // Reset form
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

    

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if(date){
                const formattedDate = DateTime.fromJSDate(new Date(date)).toISODate();
                // console.log(formattedDate);
                const response = await axios.get(`http://localhost:5000/api/calendar/listevents/${groupName}?date=${formattedDate}`)
                const data = response.data
                if (Array.isArray(data)) {
                  console.log(data);
                  setEvents(data);
                } else {
                  setEvents([])
                  console.log('Data is not an array:', data);
                }}
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchEvents();
    }, [date]);
  
    const convertTo12HourFormat = (time) => {
        const hours = parseInt(time.split(':')[0]);
        const minutes = time.split(':')[1];
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Convert hours greater than 12 to 12-hour format
        return `${adjustedHours}:${minutes} ${period}`;
    };
  
    return (
    
    <div className="utils max-w-min">
          <CustomCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-input h-fit mb-3"
          />
          <div className="day-breakdown rounded-md border border-input p-4">
            <div className="flex justify-between items-center mb-3">
              <h1 className="font-semibold text-xl">{ date ? String(date).slice(0,15) : '-'}</h1>
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
                      value={eventForm.event.name}
                      onChange={handleEventChange}
                    />
                    <Input
                      id="date"
                      placeholder="Date"
                      value={eventForm.event.date}
                      onChange={handleEventChange}
                    />
                    <Input
                      id="startTime"
                      placeholder="Start Time"
                      value={eventForm.event.startTime}
                      onChange={handleEventChange}
                    />
                    <Input
                      id="endTime"
                      placeholder="End Time"
                      value={eventForm.event.endTime}
                      onChange={handleEventChange}
                    />
                    <TextareaCN
                      id="description"
                      placeholder="Description"
                      value={eventForm.event.description}
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
              {events.length === 0 ? (
                <div className="event flex items-center justify-between border-b hover:bg-secondary py-2 pe-2 group">
                  <div className="event-details">
                    <h2 className="font-semibold text-sm">No events on this date.</h2>
                  </div>
                </div>
              ) : events.map((event, index) => (
                <Event 
                  key={index} 
                  name={event.name} 
                  time={event.startTime ? `${convertTo12HourFormat(event.startTime)} - ${convertTo12HourFormat(event.endTime)}` : 'All Day'} 
                  description={event.description}
                  onDelete={() => deleteEvent(index)} 
                  date={event.date}
                />
              ))}
            </div>
          </div>
        </div>
  );
}

export default DashboardCalendar;
