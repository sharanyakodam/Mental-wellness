import React, { useState } from "react";
import axios from "axios";

export default function MentalWellnessChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMsg = { role: "bot", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Sorry, I’m having trouble responding right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white border rounded-lg shadow-xl flex flex-col">
      <div className="bg-blue-500 text-white p-3 rounded-t-lg font-semibold">
        Mental Wellness Chatbot
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-blue-200 text-right"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-gray-100 p-2 rounded-lg text-gray-500">
            Typing...
          </div>
        )}
      </div>
      <div className="flex border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your thoughts..."
          className="flex-1 p-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
