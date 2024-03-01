import React from 'react';
import Message from './Message';
import Event from './Event';
import { Menu, Phone, Calendar, UserRoundPlus } from 'lucide-react';
import { Calendar as CustomCalendar } from '@/components/ui/calendar';
import Textarea from './Textarea';

function GroupDashboard() {
  const [date, setDate] = React.useState(new Date());
  return (
    <div className="md:w-7/12 flex justify-center h-[100px]">
      <div className="content-body flex w-full">
        <div className="chat me-3 w-full ">
          <div className="chatbox border border-input rounded-lg px-8 py-6 gap-4 mb-3">
            <div className="chatbox--header flex items-center mb-4">
              <h1 className="font-semibold text-3xl me-auto">
                forgetful-dentists
              </h1>
              <div className="icons flex gap-4 p-3">
                <Phone size={24} />
                <UserRoundPlus size={24} />
              </div>
            </div>
            <div className="chat-messages overflow-y-auto max-h-[30vh]">
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
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
              <Message
                name="Alice Smith"
                message="I'm in! Let's do it!"
                time="9:08 AM"
                avatar="src\assets\img\pexels-andrea-piacquadio-774909.jpg"
              />
            </div>
          </div>
          <Textarea
            placeholder="Type your message here."
            className="resize-none"
          />
        </div>
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
            <div className="events">
              <Event name="Meeting" time="10:00 AM" />
              <Event name="Bob’s Reminder" time="11:30 AM" />
              <Event name="Lunch Break" time="1:00 PM" />
              <Event name="Brainstorming Session" time="2:30 PM" />
              <Event name="Charlie’s DIY Dentistry Workshop" time="5:30 PM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDashboard;
