"use client";

import React, { useState } from "react";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import DonationAuthContent from '@/components/DonationAuthContent';
import HomePage from '@/components/HomePage';
import ProfilePage from '@/components/ProfilePage';
import MessageDisplay from '@/components/MessageDisplay';
import { Message } from '@/types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainMessage, setMainMessage] = useState<Message>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <MessageDisplay message={mainMessage} />

      {isLoggedIn ? (
        <ProfilePage />
      ) : (
        <HomePage 
          setIsModalOpen={setIsModalOpen} 
          setMainMessage={setMainMessage} 
        />
      )}

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <DonationAuthContent 
          onClose={() => setIsModalOpen(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      </Modal>
    </div>
  );
}