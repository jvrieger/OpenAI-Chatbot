import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// Setup OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Store conversation history in memory (for simplicity)
let messageHistory = [
  { role: "system", content: "You are a helpful assistant." }
];

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;
  
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }
  
    messageHistory.push({ role: "user", content: userMessage });
  
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messageHistory,
      });
  
      const botReply = completion.choices[0].message.content;
      messageHistory.push({ role: "assistant", content: botReply });
  
      res.json({ reply: botReply });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({
          error: "Failed to get response from OpenAI",
          details: error?.response?.data || error.message,
        });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
