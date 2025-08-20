"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, UserIcon, WalletIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { HeaderProps } from '../types';
import { useRouter } from 'next/navigation';

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, onOpenModal, userEmail }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    if (userEmail) {
      router.push(`/profile/profile_page/${userEmail.replace(/\s+/g, "-")}`);
    }
    setIsDropdownOpen(false);
  };

  const handleWalletClick = () => {
    if (userEmail) {
      router.push(`/wallet/user_wallet/${userEmail.replace(/\s+/g, "-")}`);
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/20 shadow-sm py-3 px-8 border-b border-gray-200 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-xl font-bold">DonateTransparently</span>
          <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 uppercase">Live Tracking</span>
        </div>

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer shadow-lg border border-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="size-9 bg-blue-600 rounded-full flex items-center justify-center relative">
                <UserIcon className="size-6 text-white" />
                <ChevronDownIcon className={`absolute rounded-full bg-white bottom-[-2px] right-[-2px] p-[.8px] size-[14px] text-gray-600 border border-gray-600 font-bold transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className='px-4 py-2 border-b border-gray-200'>
                  Yes
                </div>
                <button
                  onClick={handleProfileClick}
                  className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors duration-150"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={handleWalletClick}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors duration-150"
                >
                  <WalletIcon className="h-4 w-4" />
                  <span>Wallet</span>
                </button>

                <hr className="my-1 border-gray-200" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors duration-150"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenModal}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;