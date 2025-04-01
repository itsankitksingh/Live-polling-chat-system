import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-8">
          <span className="px-4 py-1 bg-[#7765DA] text-white rounded-full text-sm">
            Interview Poll
          </span>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#373737] mb-2">
            Welcome to the Live Polling System
          </h1>
          <p className="text-[#6E6E6E] text-sm">
            Please select the role that best describes you to begin using the live polling system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link 
            to="/student"
            className="p-6 bg-white rounded-lg border-2 border-[#7765DA] hover:border-[#5767D0] transition-colors cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-[#373737] mb-2">
              I'm a Student
            </h2>
            <p className="text-[#6E6E6E] text-sm">
              Lorem ipsum is simply dummy text of the printing and typesetting industry
            </p>
          </Link>

          <Link 
            to="/teacher"
            className="p-6 bg-white rounded-lg border-2 border-transparent hover:border-[#5767D0] transition-colors cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-[#373737] mb-2">
              I'm a Teacher
            </h2>
            <p className="text-[#6E6E6E] text-sm">
              Submit answers and view live poll results in real-time.
            </p>
          </Link>
        </div>

        <div className="flex justify-center">
          <button 
            className="px-8 py-3 bg-[#7765DA] hover:bg-[#5767D0] text-white rounded-lg text-lg font-medium transition-colors flex items-center gap-2"
          >
            Continue
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

