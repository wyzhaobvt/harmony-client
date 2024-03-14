import React, { useState, useEffect } from 'react';
import DashboardCalendar from './DashboardCalendar'
import DashboardMessages from './DashboardMessages'
import './GroupDashboard.css';
import { DateTime } from 'luxon'

function GroupDashboard() {

  const today = DateTime.local().toISODate();
  console.log('today',today);
  
  const [date, setDate] = React.useState(today);

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
  ]);

  return (
    <div className="md:w-3/4 xl:w-7/12 flex justify-center px-2">
      <div className="content-body flex w-full">
        <DashboardMessages date={date} setDate={setDate} messages={messages} setMessages={setMessages} />
        <div className='hidden xl:block'><DashboardCalendar date={date} setDate={setDate} /></div>
      </div>
    </div>
  );
}

export default GroupDashboard;
