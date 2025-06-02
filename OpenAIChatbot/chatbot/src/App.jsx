// App.jsx
import React, { useState } from "react";
import axios from "axios";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (input) => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5001/api/chat", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="chat-container">
      <ChatBox messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default App;
