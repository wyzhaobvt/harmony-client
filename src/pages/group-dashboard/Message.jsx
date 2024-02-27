import React from 'react';

function Message({ name, message, time, avatar }) {
  return (
    <div className="message border border-input rounded-md flex p-2 mb-2">
      <img
        src={avatar || 'https://via.placeholder.com/40'}
        alt=""
        className="rounded-full w-10 h-10 object-cover me-4"
      />
      <div className="message-body">
        <h1 className="font-semibold text-sm me-auto">{name}</h1>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

export default Message;
