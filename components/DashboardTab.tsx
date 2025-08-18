import { useState } from 'react';
import { ArrowPathIcon, GiftIcon, CalendarIcon, ChartBarIcon, ArrowTrendingUpIcon, HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const DashboardTab = () => {
  const [activeTab, setActiveTab] = useState('history');
  
  // mockdata
  const userName = "Micah";
  const userStats = {
    totalDonated: 5178.00,
    donationsMade: 4,
    charitiesSupported: 2,
    memberSince: "8/17/2025"
  };
  
  const recentDonations = [
    {
      amount: 4720.00,
      charity: "American Red Cross",
      organization: "American Red Cross",
      type: "Direct",
      date: "Aug 15, 2025",
      anonymous: false
    },
    {
      amount: 1000.00,
      charity: "UNICEF USA",
      organization: "UNICEF USA",
      type: "Random",
      date: "Aug 10, 2025",
      anonymous: true
    },
    {
      amount: 458.00,
      charity: "Local Food Bank",
      organization: "Community Food Network",
      type: "Direct",
      date: "Aug 5, 2025",
      anonymous: false
    }
  ];

  const donationStats = {
    publicDonations: { count: 3, percentage: 75 },
    anonymousDonations: { count: 1, percentage: 25 },
    directDonations: { count: 2, percentage: 50 },
    randomizedDonations: { count: 2, percentage: 50 }
  };

  const topCharities = [
    { name: "American Red Cross", amount: 4720.00 },
    { name: "UNICEF USA", amount: 1000.00 }
  ];

  const renderDonationHistory = () => (
    <div className="space-y-4">
      {recentDonations.map((donation, index) => (
        <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-lg font-bold text-gray-800">${donation.amount.toFixed(2)}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                donation.type === 'Random' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {donation.type}
              </span>
              {donation.anonymous && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Anonymous
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              To: {donation.charity}
            </p>
            <p className="text-xs text-gray-500">
              Organization: {donation.organization}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{donation.date}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* donation */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Donation Breakdown</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Public Donations</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${donationStats.publicDonations.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-800">{donationStats.publicDonations.count}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Anonymous Donations</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full" 
                    style={{ width: `${donationStats.anonymousDonations.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-800">{donationStats.anonymousDonations.count}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Direct Donations</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${donationStats.directDonations.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-800">{donationStats.directDonations.count}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Randomized Donations</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${donationStats.randomizedDonations.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-800">{donationStats.randomizedDonations.count}</span>
              </div>
            </div>
          </div>
        </div>

        {/* top charities */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Top Charities</h4>
          <div className="space-y-4">
            {topCharities.map((charity, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <span className="text-sm text-gray-700">{charity.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">${charity.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* timeline */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Donation Timeline</h4>
        <div className="flex items-center justify-center h-32 text-gray-500">
          <ChartBarIcon className="h-8 w-8 mr-2" />
          <span>Donation timeline visualization would go here</span>
        </div>
      </div>
    </div>
  );

  const renderYourImpact = () => (
    <div className="space-y-6">
      {/* impact */}
      <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-2">You have made 4 donations!</h4>
        <p className="text-gray-600 mb-4">
          Your generosity has contributed $5178.00 to 2 different charities.
        </p>
      </div>

      {/* org supported */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Organizations You have Supported</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <HeartSolid className="h-5 w-5 text-red-600" />
              </div>
              <span className="font-medium text-gray-800">American Red Cross</span>
            </div>
            <span className="text-lg font-bold text-green-600">$4720.00</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HeartSolid className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-800">UNICEF USA</span>
            </div>
            <span className="text-lg font-bold text-green-600">$1000.00</span>
          </div>
        </div>
      </div>

      {/* transparency */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Transparency Note:</h5>
            <p className="text-sm text-blue-800">
              All donations are recorded on the blockchain for complete transparency. Anonymous donations hide your identity but still contribute to the public totals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* welcome */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
          </div>
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Refresh History</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <span className="text-2xl">$</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Donated</p>
                <p className="text-2xl font-bold text-gray-800">${userStats.totalDonated.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <GiftIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Donations Made</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.donationsMade}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <HeartSolid className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Charities Supported</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.charitiesSupported}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <CalendarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-2xl font-bold text-gray-800">{userStats.memberSince}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main w/ tabs */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {activeTab === 'history' && 'Recent Donations'}
            {activeTab === 'statistics' && 'Statistics'}
            {activeTab === 'impact' && 'Your Impact'}
          </h3>
          <div className="flex space-x-4 text-sm">
            <button 
              onClick={() => setActiveTab('history')}
              className={`font-medium pb-1 ${
                activeTab === 'history' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Donation History
            </button>
            <button 
              onClick={() => setActiveTab('statistics')}
              className={`font-medium pb-1 ${
                activeTab === 'statistics' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Statistics
            </button>
            <button 
              onClick={() => setActiveTab('impact')}
              className={`font-medium pb-1 ${
                activeTab === 'impact' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Your Impact
            </button>
          </div>
        </div>
        
        {/* tab content */}
        {activeTab === 'history' && renderDonationHistory()}
        {activeTab === 'statistics' && renderStatistics()}
        {activeTab === 'impact' && renderYourImpact()}
      </div>
    </div>
  );
};

export default DashboardTab;
