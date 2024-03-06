import React, { useState, useRef, useEffect } from 'react';
import { Send, SmilePlus, Paperclip } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function Textarea({ placeholder, className }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState('');
  const emojiPickerRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerRef]);

  return (
    <div className="relative w-full flex flex-col">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className={`${className} w-full h-32 p-2 bg-background border border-input rounded-lg resize-none focus:outline-none focus:border-primary transition-all duration-200 ease-in-out pr-20`}
      />
      <div className="icons">
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
        <div ref={emojiPickerRef} className="absolute left-3 bottom-14">
          <Picker data={data} theme="light" onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
}

export default Textarea;
