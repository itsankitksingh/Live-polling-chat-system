import React from "react";

const Results = ({ pollResults }) => {
  const totalVotes = Object.values(pollResults).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {totalVotes > 0 ? (
        <div className="space-y-3">
          {Object.entries(pollResults).map(([option, votes], index) => {
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
            
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
      ) : (
        <div className="text-center py-8 text-[#6E6E6E]">
          No results yet.
        </div>
      )}
    </div>
  );
};

export default Results;