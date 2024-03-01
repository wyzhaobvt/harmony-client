import React, { useState } from 'react';
import { Send, SmilePlus, Paperclip } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function Textarea({ placeholder, className }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState('');

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
  };

  return (
    <div className="relative w-full flex flex-col">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={`${className} w-full h-32 p-2 bg-background border border-input rounded-lg resize-none focus:outline-none focus:border-primary transition-all duration-200 ease-in-out pr-20`}
      />
      <div className="emojis">
        <div className="absolute left-3 bottom-3 transform space-x-2 flex items-center">
          <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <SmilePlus size={24} />
          </div>
          <Paperclip size={24} />
        </div>
        <div className="absolute right-3 bottom-3 transform space-x-2 flex items-center">
          <Send size={24} />
        </div>
      </div>
      {showEmojiPicker && (
        <div className="absolute left-3 bottom-14">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}

export default Textarea;
