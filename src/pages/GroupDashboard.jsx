import React from 'react';
import { Menu, Phone, Calendar, UserRoundPlus } from 'lucide-react';

function GroupDashboard() {
  return (
    <div>
      <div className="header flex items-center h-16 shadow-md">
        <Menu color="black" size={36} className="m-4" />
        <h1 className="font-semibold text-3xl">Harmony</h1>
      </div>
      <div className="content-body">
        <div className="chat">
          <div className="chatbox">
            <div className="chatbox--header">
              <h1 className="font-semibold text-3xl">forgetful-dentists</h1>
              <div className="icons border m-5">
                <Phone color="black" size={36} className="m-4" />
                <UserRoundPlus color="black" size={36} className="m-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDashboard;
