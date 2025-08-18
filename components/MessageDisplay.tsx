import React from 'react';
import { MessageDisplayProps } from '../types';

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  if (!message) return null;

  const getMessageStyles = () => {
    switch (message.type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl py-3 px-6 rounded-full text-center font-medium shadow-lg z-40 ${getMessageStyles()}`}>
      {message.text}
    </div>
  );
};

export default MessageDisplay;