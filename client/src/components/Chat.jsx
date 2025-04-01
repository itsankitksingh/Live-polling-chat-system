import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { FaUserMinus } from 'react-icons/fa6';

const socket = io("https://live-polling-server-o5wm.onrender.com"); 

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("students", (studentsList) => {
      setStudents([...new Set(studentsList)]);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("students");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msg = { user, text: message };
      socket.emit("chatMessage", msg);
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleKickStudent = (studentName) => {
    socket.emit("kickStudent", studentName);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-[#7765DA] hover:bg-[#6655CA] text-white rounded-full shadow-lg transition-colors flex items-center justify-center focus:outline-none"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-[#7765DA] text-white flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-1 rounded-full text-sm transition-colors ${activeTab === "chat" ? "bg-white text-[#7765DA]" : "text-white hover:bg-white/10"}`}
              >
                Chat
              </button>
              {user === "Teacher" && (
                <button
                  onClick={() => setActiveTab("participants")}
                  className={`px-4 py-1 rounded-full text-sm transition-colors ${activeTab === "participants" ? "bg-white text-[#7765DA]" : "text-white hover:bg-white/10"}`}
                >
                  Participants
                </button>
              )}
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto bg-gray-50">
            {activeTab === "chat" ? (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.user === user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.user === user ? 'bg-[#7765DA] text-white' : 'bg-white border border-gray-200 text-[#373737]'}`}
                    >
                      <div className="text-xs mb-1 font-medium">{msg.user}</div>
                      <div>{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
                    >
                      <span className="text-[#373737]">{student}</span>
                      <button
                        onClick={() => handleKickStudent(student)}
                         className="text-blue-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        aria-label={`Remove ${student}`}
                       
                      >
                        {/* <FaUserMinus className="w-5 h-5" /> */}
                        Kick out
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[#6E6E6E] text-center py-4">
                    No students have joined yet
                  </p>
                )}
              </div>
            )}
          </div>
          {activeTab === "chat" && (
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7765DA] focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-[#7765DA] text-white rounded-lg hover:bg-[#6655CA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;