import React, { useState } from 'react';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import DonationModal from './DonationModal';

interface CharityCardProps {
  name: string;
  description: string;
  received: number;
  organizations: string[];
  setIsModalOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
}

const CharityCard: React.FC<CharityCardProps> = ({
  name,
  description,
  received,
  organizations,
  setIsModalOpen,
  isLoggedIn
}) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);


  const handleDonateClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsDonationModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Total Received
            </p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              ${received.toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Organizations
            </p>
            <ul className="mt-1 text-gray-700 space-y-1">
              {organizations.map((org, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  {org}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sm:flex space-x-4 mt-auto space-y-2">
          <button
            onClick={handleDonateClick}
            className="flex-1 bg-gradient-to-r w-full cursor-pointer from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <HeartIcon className="h-4 w-4" />
            <span className=' text-nowrap'>Donate Now</span>
          </button>

          <Link
            href={`/charity/charity_profile/${name.replace(/\s+/g, "-")}`}
            className="flex-1 text-nowrap bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center flex items-center justify-center"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* donation modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        charityName={name}
        organizations={organizations}
      />
    </>
  );
};

export default CharityCard;