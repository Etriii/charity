"use client";

import React, { useState, useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import DonationAuthContent from '@/components/DonationAuthContent';
import HomePage from '../components/HomePage';
import LoggedInHomePage from '../components/LoggedInHomePage';
import MessageDisplay from '@/components/MessageDisplay';
import { Message, User } from '@/types';



const getCurrentSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('donateTransparentlyCurrentUser');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const setCurrentSession = (user?: User) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('donateTransparentlyCurrentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('donateTransparentlyCurrentUser');
    }
  }
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainMessage, setMainMessage] = useState<Message | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const existingUser = getCurrentSession();
    if (existingUser) {
      setIsLoggedIn(true);
      setCurrentUser(existingUser);
    }
  }, []);

  const handleLoginSuccess = () => {
    const user = getCurrentSession();
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setIsModalOpen(false);
      setMainMessage({
        type: 'success',
        text: `Welcome back, ${user.username}!`
      });
    }

    setTimeout(() => setMainMessage(null), 3000);
  };

  const handleLogout = () => {
    setCurrentSession(undefined);
    setIsLoggedIn(false);
    setCurrentUser(undefined);

    setMainMessage({
      type: 'info',
      text: 'You have been logged out successfully.'
    });

    setTimeout(() => {
      setMainMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenModal={() => setIsModalOpen(true)}
        userEmail={currentUser?.email}
      />

      <MessageDisplay message={mainMessage} />

      {isLoggedIn ? (
        <LoggedInHomePage
          setIsModalOpen={setIsModalOpen}
          setMainMessage={setMainMessage}
          userName={currentUser?.username || "User"}
        />
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
          onLogout={handleLogout}
        />
      </Modal>
    </div>
  );
}