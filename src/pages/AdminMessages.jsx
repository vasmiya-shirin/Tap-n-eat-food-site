import React, { useState, useEffect } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(savedMessages);
  }, []);

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">📩 User Messages</h2>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border relative"
            >
              <h3 className="text-lg font-semibold">{msg.name}</h3>
              <p className="text-sm text-gray-600">📧 {msg.email}</p>
              {msg.phone && <p className="text-sm text-gray-600">📞 {msg.phone}</p>}
              <p className="mt-2 font-medium">Subject: {msg.subject || "(No Subject)"}</p>
              <p className="mt-2">{msg.message}</p>

              <button
                onClick={() => handleDelete(index)}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
