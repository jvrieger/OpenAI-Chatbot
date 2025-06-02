// components/Message.jsx
import React from "react";

const Message = ({ sender, text }) => {
  const messageClass = sender === "user" ? "user-message" : "bot-message";
  return <div className={messageClass}>{text}</div>;
};

export default Message;
