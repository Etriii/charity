import React, { useState } from 'react';
import Link from 'next/link';
import { HeartIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';
import DonationModal from './DonationModal';

interface CharityCardProps {
  name: string;
  description: string;
  received: number;
  organizations: string[];
  setIsModalOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  category?: string;
  location?: string;
  establishedYear?: string;
  donorCount?: number;
  coverImage?: string;
  logo?: string;
}

const CharityCard: React.FC<CharityCardProps> = ({
  name,
  description,
  received,
  organizations,
  setIsModalOpen,
  isLoggedIn,
  category = "Water & Sanitation",
  location = "Global",
  establishedYear = "2018",
  donorCount = 4,
  coverImage,
  logo
}) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const handleDonateClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsDonationModalOpen(true);
    }
  };

  console.log(`Organizations for ${name}:`, organizations);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col">
        {/* cover */}
        <div className="relative">
          <div
            className="h-48 bg-gradient-to-br from-purple-500 to-pink-600"
            style={{
              backgroundImage: coverImage ? `url(${coverImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>

          <div className="p-6 flex flex-col flex-grow">
          {/* header w/ logo & title */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              {logo ? (
                <image href={logo} className="h-8 w-8 rounded-full">
                  <title>{name}</title>
                </image>
              ) : (
                <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 leading-tight">{name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPinIcon className="h-3 w-3 mr-1" />
                {location}
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
            {description}
          </p>

          <h4 className="text-sm font-semibold text-gray-700 mb-2">Organizations:</h4>
          <div className="space-y-1 mb-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {organizations && organizations.length > 0 ? (
                organizations.map((org) => (
                  <div key={org} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {org}
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 italic">No organizations listed</div>
              )}
            </div>
          </div>

          {/* stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="font-bold text-purple-700 text-lg">
                ${received.toLocaleString()}
              </div>
              <div className="text-gray-600 text-xs">Total Raised</div>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <div className="font-bold text-pink-700 text-lg">{donorCount}</div>
              <div className="text-gray-600 text-xs">Donors</div>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-500 mb-4">
            <CalendarIcon className="h-3 w-3 mr-1" />
            Established {establishedYear}
          </div>

            <div className="flex space-x-3 mt-auto pt-4">
            <Link
              href={`/charity/charity_profile/${name.replace(/\s+/g, "-")}`}
              className="flex-1 text-sm bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center flex items-center justify-center"
            >
              Learn More
            </Link>
            <button
              onClick={handleDonateClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <HeartIcon className="h-4 w-4" />
              <span className="text-sm">Donate</span>
            </button>
          </div>
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