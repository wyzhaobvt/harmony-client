import React from 'react';
import Message from './Message';
import { Menu, Phone, Calendar, UserRoundPlus } from 'lucide-react';
import { Calendar as CustomCalendar } from '@/components/ui/calendar';

function GroupDashboard() {
  const [date, setDate] = React.useState(new Date());
  return (
    <div className="md:w-3/4 flex justify-center">
      <div className="content-body flex">
        <div className="chat me-3">
          <div className="chatbox border border-input rounded-lg px-8 py-6 gap-4">
            <div className="chatbox--header flex items-center mb-4">
              <h1 className="font-semibold text-3xl me-auto">
                forgetful-dentists
              </h1>
              <div className="icons flex gap-4 p-3">
                <Phone size={28} className="" />
                <UserRoundPlus size={28} className="" />
              </div>
            </div>
            <div className="chat-messages">
              <Message
                name="Bob Johnson"
                message="Hey team, remember that meeting today at 10?"
                time="9:00 AM"
                avatar="src\assets\img\pexels-justin-shaifer-1222271.jpg"
              />
              <Message
                name="Alice Smith"
                message="Oh shoot, I totally forgot! Can we reschedule? I have a dentist appointment."
                time="9:05 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
              <Message
                name="Charlie Brown"
                message="Don't worry, I'll bring a drill and some pliers. We'll multitask!"
                time="9:07 AM"
                avatar="src\assets\img\pexels-nitin-khajotia-1516680.jpg"
              />
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
            </div>
          </div>
        </div>
        <div className="utils">
          <CustomCalendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-input h-fit mb-3"
          />
          <div className="day-breakdown rounded-md border border-input p-4">
            <h1 className="font-semibold text-3xl mb-3">Today</h1>
            <div className="events">
              <div className="event w-full mb-2">
                <div className="event-details w-full">
                  <h2 className="font-semibold">Dentist Appointment</h2>
                  <p>12:00 PM</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDashboard;
