import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onViewSelect: (view: string) => void;
}

function LandingPage({ onViewSelect }: LandingPageProps) {
  const [showClientOptions, setShowClientOptions] = useState(false);
  const navigate = useNavigate();

  const handleClientViewClick = () => {
    setShowClientOptions(!showClientOptions);
  };

  const handleOptionClick = (option: string) => {
    onViewSelect(option);
    navigate(`/client-view/${option}`);
  };

  const handlePeopleViewClick = () => {
    onViewSelect('people');
    navigate('/people-view');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* IBM Logo */}
      <div className="mb-8">
        <img
          src="/IBMLOGO.svg"
          alt="IBM Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Welcome Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 mb-12 text-center"
      >
        Welcome to IBM's Technology Coverage Dashboard
      </motion.h1>

      {/* Navigation Options */}
      <div className="space-y-6 w-full max-w-md">
        {/* Client View Button */}
        <div className="relative">
          <button
            onClick={handleClientViewClick}
            className="w-full bg-[#0F62FE] text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-[#0353E9] transition-colors flex items-center justify-center space-x-2"
          >
            <span>Client View</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                showClientOptions ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Client View Options */}
          <AnimatePresence>
            {showClientOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => handleOptionClick('data')}
                  className="w-full py-2 px-4 text-left hover:bg-gray-100 transition-colors duration-200"
                >
                  Data
                </button>
                <button
                  onClick={() => handleOptionClick('automation')}
                  className="w-full py-2 px-4 text-left hover:bg-gray-100 transition-colors duration-200"
                >
                  Automation
                </button>
                <button
                  onClick={() => handleOptionClick('infrastructure')}
                  className="w-full py-2 px-4 text-left hover:bg-gray-100 transition-colors duration-200"
                >
                  Infrastructure
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* People View Button */}
        <button
          onClick={handlePeopleViewClick}
          className="w-full bg-[#0F62FE] text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-[#0353E9] transition-colors"
        >
          People View
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        © 2024 IBM Corporation. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage; 