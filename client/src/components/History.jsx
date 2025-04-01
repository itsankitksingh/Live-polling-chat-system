import React from "react";

const History = ({ pollHistory }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-[#373737] mb-6">View Poll History</h1>
      
      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4">
        {pollHistory.length === 0 ? (
          <div className="text-center py-8 text-[#6E6E6E]">
            No past polls available.
          </div>
        ) : (
          pollHistory.map((poll, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <h2 className="text-lg font-semibold text-[#373737]">
                Question {questionIndex + 1}
              </h2>
              
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                <div className="bg-[#373737] text-white p-4">
                  <p className="font-medium">{poll.question}</p>
                </div>

                <div className="p-4 space-y-3">
                  {Object.entries(poll.results).map(([option, votes], index) => {
                    // Calculate percentage
                    const total = Object.values(poll.results).reduce((a, b) => a + b, 0);
                    const percentage = total > 0 ? (votes / total) * 100 : 0;
                    
                    return (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#7765DA] flex items-center justify-center text-white text-xs">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-[#373737]">{option}</span>
                          </div>
                          <span className="text-[#6E6E6E] text-sm">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
                          <div 
                            className="h-full bg-[#7765DA] rounded-md transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;

