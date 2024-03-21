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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Event({ name, date, description, onDelete}) {
  console.log(name, date, description);
  return (
    <div className="event flex items-center justify-between border-b hover:bg-secondary py-2 pe-2 group">
      <div className="event-details">
        <h2 className="font-semibold text-sm">{name}</h2>
        <p className="text-sm">{date.slice(0,10)} | {date.slice(11,16)} - {date.slice(20,25)}</p>
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
  console.log(events);
  
  const [eventForm, setEventForm] = useState({
    calendar: groupName,
    event: {name: '', date: '', startTime: '', endTime: '', description: ''},
  });

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
    const { id, value } = e.target || e;
    setEventForm((prevEventForm) => ({
      ...prevEventForm,
      event: {
        ...prevEventForm.event,
        [id]: value,
      },
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/calendar/createevent', eventForm);
      console.log('Event added:', response.data);
      setEventForm({
        calendar: groupName,
        event: {name: '', date: '', startTime: '', endTime: '', description: ''},
      }); // Reset form
      return response.data;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error; // Throw the error if needed
    }
    
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  // console.log(date);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // console.log('Use Effect Has Ran!');
                setEvents([])
                console.log('Use Effect - Date:',date);
                if(date){
                const formattedDate = DateTime.fromJSDate(new Date(date)).toISODate();
                console.log('Use Effect - Formatted Date:', formattedDate);
                const response = await axios.get(`http://localhost:5000/api/calendar/listevents/${groupName}?date=${formattedDate}`)
                const data = response.data
                if (Array.isArray(data)) {
                  console.log('Use Effect - Data:',data);
                  setEvents(data);
                } else {
                  setEvents([])
                  // console.log('Data is not an array:', data);
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
            onSelect={(date) => setDate(date)}
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
                    <DatePicker className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"'
                      selected={eventForm.event.date}
                      id="date"
                      placeholderText="Date"
                      value={eventForm.event.date}
                      wrapperClassName="date-picker-wrapper" // Optional, for styling purposes
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) => handleEventChange({ target: { id: 'date', value: date } })}
                      autocomplete="off"
                    />
                    <Input
                      id="startTime"
                      placeholder="Start Time (24hr Format)"
                      value={eventForm.event.startTime}
                      onChange={handleEventChange}
                    />
                    <Input
                      id="endTime"
                      placeholder="End Time (24hr Format)"
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
