import React from 'react'
import {useState, useEffect} from 'react'
import { Calendar as CustomCalendar } from '@/components/ui/calendar';
import Event from './Event'
import './GroupDashboard.css';
import axios from 'axios';
import { DateTime } from 'luxon'

function DashboardCalendar({date, setDate}) {  

    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
    
            try {
                if(date){
                const formattedDate = DateTime.fromJSDate(new Date(date)).toISODate();
                console.log(formattedDate);
                const response = await axios.get(`http://localhost:5000/api/calendar/listevents/group2?date=${formattedDate}`)
                const data = response.data
                if (Array.isArray(data)) {
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
              <h1 className="font-semibold text-3xl">Today</h1>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-1 px-4 rounded">
                Add
              </button>
            </div>
            <div className="event-list">
              {events.length === 0 ? (
                <div className="event flex items-center justify-between border-b hover:bg-secondary py-2 pe-2 group">
                  <div className="event-details">
                    <h2 className="font-semibold text-sm">No events on this date.</h2>
                  </div>
                </div>
              ) : events.map((event, index) => (
                <Event key={index} name={event.name} time={`${convertTo12HourFormat(event.startTime)} - ${convertTo12HourFormat(event.endTime)}`} description={event.description} />
              ))}
            </div>
          </div>
        </div>
  );
}

export default DashboardCalendar;
