// frontend/components/ChatBot.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your AI Health Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:4000/api/chat', {
        message: input,
      });

      setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error("Frontend Error:", error.response?.data || error.message);
      setMessages([...newMessages, { sender: 'bot', text: 'Something went wrong. Try again later.' }]);
    }

    setInput('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">AI ChatBot</h2>
      <div className="border rounded p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'bot' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-primary text-white px-4 rounded-r">Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
