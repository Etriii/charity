import { useEffect, useState } from 'react';
import { ArrowPathIcon, GiftIcon, CalendarIcon, ChartBarIcon, ArrowTrendingUpIcon, HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

type Donation = {
  amount: number;
  charity: string;
  organization: string;
  type: string;
  date: string;
  anonymous: boolean;
  email: string;
  datetime: string;
};

interface DashboardTabProps {
  userEmail: string;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ userEmail }) => {
  const [activeTab, setActiveTab] = useState("history");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [userStats, setUserStats] = useState({
    totalDonated: 0,
    donationsMade: 0,
    charitiesSupported: 0,
    memberSince: "",
  });

  // refreshes data from localStorage
  const refreshData = () => {
    try {
      //loads datafrom localstorage
      const stored = localStorage.getItem("donations");
      const allDonations: Donation[] = stored ? JSON.parse(stored) : [];

      // filters donations for current logged in user
      const userDonations = allDonations.filter(donation => donation.email === userEmail);

      // sorts doantion by datetime in descending order
      const sortedDonations = userDonations.sort((a, b) => {
        return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
      });

      setDonations(sortedDonations);

      //cal stats
      if (sortedDonations.length > 0) {
        const totalDonated = sortedDonations.reduce((sum, d) => sum + d.amount, 0);
        const donationsMade = sortedDonations.length;
        const charitiesSupported = new Set(sortedDonations.map((d) => d.charity)).size;

        const firstDonationDate = sortedDonations[sortedDonations.length - 1].date;

        setUserStats({
          totalDonated,
          donationsMade,
          charitiesSupported,
          memberSince: firstDonationDate,
        });
      } else {
        setUserStats({
          totalDonated: 0,
          donationsMade: 0,
          charitiesSupported: 0,
          memberSince: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }),
        });
      }
    } catch (error) {
      console.error('Error loading donations from localStorage:', error);
      setUserStats({
        totalDonated: 0,
        donationsMade: 0,
        charitiesSupported: 0,
        memberSince: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }),
      });
    }
  };

  useEffect(() => {
    refreshData();

    // local storage listener when donations are added
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'donations') {
        refreshData();
      }
    };

    const handleDonationUpdate = () => {
      refreshData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('donationAdded', handleDonationUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('donationAdded', handleDonationUpdate);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]); // re-runs when email changes

  // cal stats from user's donations
  const donationStats = {
    publicDonations: {
      count: donations.filter((d) => !d.anonymous).length,
      percentage:
        donations.length > 0
          ? (donations.filter((d) => !d.anonymous).length / donations.length) * 100
          : 0,
    },
    anonymousDonations: {
      count: donations.filter((d) => d.anonymous).length,
      percentage:
        donations.length > 0
          ? (donations.filter((d) => d.anonymous).length / donations.length) * 100
          : 0,
    },
    directDonations: {
      count: donations.filter((d) => d.type === "Direct").length,
      percentage:
        donations.length > 0
          ? (donations.filter((d) => d.type === "Direct").length / donations.length) * 100
          : 0,
    },
    randomizedDonations: {
      count: donations.filter((d) => d.type === "Random").length,
      percentage:
        donations.length > 0
          ? (donations.filter((d) => d.type === "Random").length / donations.length) * 100
          : 0,
    },
  };

  // cal top charities from user's donations
  const topCharities: { charity: string; total: number }[] = Object.values(
    donations.reduce((acc: Record<string, { charity: string; total: number }>, donation) => {
      if (!acc[donation.charity]) {
        acc[donation.charity] = { charity: donation.charity, total: 0 };
      }
      acc[donation.charity].total += donation.amount;
      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total); // sorts by total amount descending

  const renderDonationHistory = () => (
    <div className="space-y-4">
      {donations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GiftIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No donations yet. Start making a difference today!</p>
        </div>
      ) : (
        donations.slice(0, 5).map((donation, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-lg font-bold text-gray-800">
                  ${donation.amount.toFixed(2)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${donation.type === "Random"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {donation.type}
                </span>
                {donation.anonymous && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Anonymous
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">To: {donation.charity}</p>
              <p className="text-xs text-gray-500">
                Organization: {donation.organization}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{donation.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* donations */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Donation Breakdown</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Public Donations</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
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
                    className="bg-gray-600 h-2 rounded-full transition-all duration-500"
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
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
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
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
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
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Top Charities</h4>
          <div className="space-y-4">
            {topCharities.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No donations yet</p>
              </div>
            ) : (
              topCharities.map((charity, index) => (
                <div key={charity.charity} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-500' : 'bg-green-500'
                      }`}></div>
                    <span className="text-sm text-gray-700">{charity.charity}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">${charity.total.toFixed(2)}</span>
                </div>
              ))
            )}
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
      {/* impact summary */}
      <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-2">
          You have made {userStats.donationsMade} donation{userStats.donationsMade !== 1 ? 's' : ''}!
        </h4>
        <p className="text-gray-600 mb-4">
          Your generosity has contributed ${userStats.totalDonated.toFixed(2)} to {userStats.charitiesSupported} different {userStats.charitiesSupported === 1 ? 'charity' : 'charities'}.
        </p>
      </div>

      {/* orgs supported */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Organizations You Have Supported</h4>
        <div className="space-y-4">
          {topCharities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <HeartSolid className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Start donating to see your impact!</p>
            </div>
          ) : (
            topCharities.map((charity, index) => (
              <div key={charity.charity} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index % 4 === 0 ? 'bg-red-100' :
                      index % 4 === 1 ? 'bg-blue-100' :
                        index % 4 === 2 ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                    <HeartSolid className={`h-5 w-5 ${index % 4 === 0 ? 'text-red-600' :
                        index % 4 === 1 ? 'text-blue-600' :
                          index % 4 === 2 ? 'text-green-600' : 'text-purple-600'
                      }`} />
                  </div>
                  <span className="font-medium text-gray-800">{charity.charity}</span>
                </div>
                <span className="text-lg font-bold text-green-600">${charity.total.toFixed(2)}</span>
              </div>
            ))
          )}
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
      <div className="bg-gradient-to-r from-purple-50 to-purple-50 rounded-3xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
            <p className="text-gray-600">Showing data for: {userEmail}</p>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
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
              className={`font-medium pb-1 transition-colors ${activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Donation History
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`font-medium pb-1 transition-colors ${activeTab === 'statistics'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`font-medium pb-1 transition-colors ${activeTab === 'impact'
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