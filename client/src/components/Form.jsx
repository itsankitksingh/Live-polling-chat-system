import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://live-polling-server-o5wm.onrender.com"); 

const Form = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctOptions, setCorrectOptions] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(60);

  useEffect(() => {
    // Initialize correctOptions for existing options
    const initialCorrectOptions = {};
    options.forEach((option, index) => {
      initialCorrectOptions[index] = index === 0 ? true : false;
    });
    setCorrectOptions(initialCorrectOptions);
  }, []);

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
    setCharCount(value.length);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index, isCorrect) => {
    setCorrectOptions(prev => ({
      ...prev,
      [index]: isCorrect
    }));
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const correctOption = options[Object.entries(correctOptions).find(([_, isCorrect]) => isCorrect)[0]];
    const questionData = {
      text: question,
      options: options.filter(option => option.trim()),
      correctOption
    };
    socket.emit("submitQuestion", questionData);
    setQuestion("");
    setOptions([]);
    setCorrectOptions({});
    setCharCount(0);
  };

  const addOption = () => {
    const newIndex = options.length;
    setOptions([...options, ""]);
    setCorrectOptions(prev => ({
      ...prev,
      [newIndex]: false
    }));
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    
    // Update correctOptions after removing an option
    const newCorrectOptions = {};
    Object.entries(correctOptions).forEach(([key, value]) => {
      const keyNum = parseInt(key);
      if (keyNum < index) {
        newCorrectOptions[keyNum] = value;
      } else if (keyNum > index) {
        newCorrectOptions[keyNum - 1] = value;
      }
    });
    setCorrectOptions(newCorrectOptions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-4 py-1 bg-[#7765DA] text-white rounded-full text-sm">
          Intervue Poll
        </span>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#373737] mb-2">
          Let's Get Started
        </h1>
        <p className="text-[#6E6E6E] text-sm">
          you'll have the ability to create and manage polls, ask questions, and monitor
          your students' responses in real-time.
        </p>
      </div>
      
      <form onSubmit={handleQuestionSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium text-[#373737]">Enter your question</label>
          <div className="relative">
            <select 
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="appearance-none bg-gray-100 rounded-md py-1 pl-3 pr-8 text-sm font-medium text-[#373737]"
            >
              <option value={60}>60 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={90}>90 seconds</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4">
          <textarea
            placeholder="Enter your name"
            value={question}
            onChange={handleQuestionChange}
            className="w-full p-2 bg-transparent focus:outline-none text-[#373737] placeholder-gray-400 text-base resize-none"
            required
            maxLength={100}
            rows={3}
          />
          <div className="text-right text-sm text-gray-500">{charCount}/100</div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <h2 className="text-lg font-medium text-[#373737]">Edit Options</h2>
          <h2 className="text-lg font-medium text-[#373737]">Is it Correct?</h2>
        </div>
        
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#7765DA] text-white flex items-center justify-center flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-grow">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none text-[#373737] placeholder-gray-400 text-base"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`correct-yes-${index}`}
                  name={`correctOption-${index}`}
                  checked={correctOptions[index] === true}
                  onChange={() => handleCorrectOptionChange(index, true)}
                  className="w-4 h-4 text-[#7765DA] focus:ring-[#7765DA] cursor-pointer"
                />
                <label htmlFor={`correct-yes-${index}`} className="text-sm text-[#373737] cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`correct-no-${index}`}
                  name={`correctOption-${index}`}
                  checked={correctOptions[index] === false}
                  onChange={() => handleCorrectOptionChange(index, false)}
                  className="w-4 h-4 text-[#7765DA] focus:ring-[#7765DA] cursor-pointer"
                />
                <label htmlFor={`correct-no-${index}`} className="text-sm text-[#373737] cursor-pointer">No</label>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addOption}
          className="flex items-center justify-center gap-2 text-[#7765DA] font-medium"
        >
          <span className="text-lg">+</span> Add More option
        </button>
        
        <div className="mt-8 flex justify-center">
          <button 
            type="submit"
            disabled={!question.trim() || options.length < 2 || !Object.values(correctOptions).some(val => val === true)}
            className="bg-[#7765DA] text-white py-3 px-12 rounded-full hover:bg-[#6655CA] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#7765DA] focus:ring-offset-2"
          >
            Ask Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
