import React from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, onOpenModal }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-4 px-8 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-xl font-bold">DonateTransparently</span>
          <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 uppercase">Live Tracking</span>
        </div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout} 
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        ) : (
          <button
            onClick={onOpenModal}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Create Account
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;