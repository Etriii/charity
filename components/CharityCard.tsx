import Link from 'next/link';
import React from 'react';


type CharityCardProps = {
  name: string;
  description: string;
  received: number;
  organizations: string[];
  setIsModalOpen: (value: boolean) => void;
  setMainMessage: (message: string) => void;
};

const CharityCard: React.FC<CharityCardProps> = ({
  name,
  description,
  received,
  organizations,
  setIsModalOpen,
  setMainMessage,
}) => {
  const handleDonateNow = () => {
    setIsModalOpen(true);
  };

  return (
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
            {organizations.map((org: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                {org}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex space-x-4 mt-auto">
        <button
          onClick={handleDonateNow}
          className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Donate Now
        </button>

        <Link
          href={`/charity/charity_profile/${encodeURIComponent(name)}`}
          className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-full hover:bg-gray-200 transition-colors duration-200 text-center"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default CharityCard;
