// TestimonialCard.tsx
import React from 'react';
import Image from 'next/image';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  imageSrc: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, imageSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start mb-4">
        <ChatBubbleLeftRightIcon  className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
        <p className="text-gray-600 italic leading-relaxed">{quote}</p>
      </div>
      
      <div className="flex items-center mt-6">
        <Image 
          src={imageSrc} 
          alt={author}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full mr-4 object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=e5e7eb&color=374151&size=48`;
          }}
        />
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;