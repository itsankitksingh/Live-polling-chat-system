import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Form from "../components/Form";
import Results from "../components/Results";
import Chat from "../components/Chat";
import History from "../components/History";
import { IoEye } from "react-icons/io5";

const socket = io("https://live-polling-server-o5wm.onrender.com");

const Teacher = () => {
  const [pollResults, setPollResults] = useState({});
  const [pollHistory, setPollHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("ask");

  useEffect(() => {
    socket.on("pollResults", (results) => {
      setPollResults(results);
      setPollHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        if (updatedHistory.length > 0) {
          updatedHistory[updatedHistory.length - 1].results = results;
        }
        return updatedHistory;
      });
    });

    socket.on("question", (questionData) => {
      setPollHistory((prevHistory) => {
        const newPollData = {
          question: questionData.text,
          results: {}
        };
        return [...prevHistory, newPollData];
      });
    });

    return () => {
      socket.off("pollResults");
      socket.off("question");
    };
  }, []);

  const handleKickStudent = (studentName) => {
    socket.emit("kickStudent", studentName);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold text-[#373737]">Teacher</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("ask")}
                className={`px-4 py-2 rounded-full transition-colors ${activeTab === "ask" ? "bg-[#8F64E1] text-white" : "text-[#6E6E6E] hover:bg-gray-50"}`}
              >
                Ask Question
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded-full transition-colors ${activeTab === "history" ? "bg-[#8F64E1] text-white" : "text-[#6E6E6E] hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-1">
                  <IoEye className="w-5 h-5" />
                  <span>View Poll History</span>
                </div>

              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex p-6">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {activeTab === "ask" ? (
            <>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#373737]">Create New Question</h2>
                </div>
                <Form />
              </div>

              {Object.keys(pollResults).length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[#373737] mb-6">Current Poll Results</h2>
                  <Results pollResults={pollResults} />
                </div>
              )}


            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#373737] mb-6">Poll History</h2>
              <History pollHistory={pollHistory} />
            </div>
          )}
        </div>
      </div>
      <Chat user="Teacher" />
    </div>
  );
};

export default Teacher;

