import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto pt-24 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Your Donor Profile</h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Welcome back! Here you can view your donation history and impact.
        </p>
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Donation History</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Donation to UNICEF</span>
              <span className="font-semibold text-green-600">$500</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Donation to Red Cross</span>
              <span className="font-semibold text-green-600">$42</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Donation to Doctors Without Borders</span>
              <span className="font-semibold text-green-600">$100</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;