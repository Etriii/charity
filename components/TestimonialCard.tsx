import React from 'react';
import { TestimonialCardProps } from '../types';

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, imageSrc }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <img
        src={imageSrc}
        alt={`${author}'s profile`}
        className="rounded-full mb-4 object-cover h-24 w-24 border-4 border-white shadow-lg"
      />
      <p className="text-lg font-medium text-gray-800 mb-4 leading-relaxed italic">
        {`"${quote}"`}
      </p>
      <div className="text-sm font-semibold text-gray-900">{author}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
};

export default TestimonialCard;