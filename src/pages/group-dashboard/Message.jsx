import React from 'react';

function Message({ name, message, time, avatar }) {
  // Split the message by newline characters and map each line to a JSX element
  const messageLines = message.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="message border border-input rounded-md flex p-2 mb-2">
      <img
        src={avatar || 'https://via.placeholder.com/40'}
        alt=""
        className="rounded-full w-10 h-10 object-cover me-4 flex-shrink-0"
      />
      <div className="message-body">
        <h1 className="font-semibold text-sm me-auto">{name}</h1>
        <p className="text-sm">{messageLines}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

export default Message;
