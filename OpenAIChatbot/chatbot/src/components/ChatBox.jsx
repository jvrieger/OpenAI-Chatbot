// components/ChatBox.jsx
import React from "react";
import Message from "./Message";

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, idx) => (
        <Message key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default ChatBox;
