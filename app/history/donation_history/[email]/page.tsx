"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  DollarSign,
  Shield,
  Calendar,
  Building,
  Search,
  Loader2,
  Heart,
  User
} from "lucide-react";

type Donation = {
  organization: string;
  donation: string;
  date: string;
  type?: string;
  anonymous?: boolean;
  charity: string,
  amount?: number;
  datetime: string;
};

interface User {
  username: string;
  email: string;
  password: string;
  id: string;
  createdAt: string;
}

interface DonationRecord {
  amount: number;
  anonymous: boolean;
  charity: string;
  date: string;
  datetime: string;
  email: string;
  organization: string;
  type: string;
}

// get donations from localstorage
const getDonationsFromStorage = (): DonationRecord[] => {
  if (typeof window !== 'undefined') {
    const donationsJson = localStorage.getItem('donations');
    if (donationsJson) {
      try {
        const parsed = JSON.parse(donationsJson);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        console.error('Error parsing donations from localStorage:', error);
        return [];
      }
    }
  }
  return [];
};

// get user from localstorage
const getUsersFromStorage = (): User[] => {
  if (typeof window !== 'undefined') {
    const usersJson = localStorage.getItem('donateTransparentlyUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  }
  return [];
};

// filter donations for current user
const getUserDonations = (userEmail: string): Donation[] => {
  const donations = getDonationsFromStorage();

  const filteredAndSorted = donations
    .filter(donation => donation.email?.toLowerCase() === userEmail.toLowerCase())
    .sort((a, b) => {
      const dateA = new Date(a.datetime || a.date);
      const dateB = new Date(b.datetime || b.date);

      return dateB.getTime() - dateA.getTime();
    });

  return filteredAndSorted.map(donation => ({
    organization: donation.organization || donation.charity || 'Unknown Organization',
    donation: `$${donation.amount}`,
    date: donation.date || new Date(donation.datetime).toLocaleDateString(),
    datetime: donation.datetime,
    type: donation.type,
    anonymous: donation.anonymous,
    amount: donation.amount,
    charity: donation.charity
  }));
};


export default function DonationHistory(): JSX.Element {
  const router = useRouter();
  const params = useParams();

  const emailParam = params?.email as string;
  const decodedEmail = emailParam ? decodeURIComponent(emailParam) : '';

  // state
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAnonymous, setSelectedAnonymous] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  // load user data and donations
  useEffect(() => {
    if (!decodedEmail) {
      setError("No email parameter found in URL");
      setLoading(false);
      return;
    }

    // find current logged in user
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email.toLowerCase() === decodedEmail.toLowerCase());

    if (!foundUser) {
      setError("User not found");
      setLoading(false);
      return;
    }

    setUser(foundUser);

    // get user donations
    const userDonations = getUserDonations(foundUser.email);
    setDonations(userDonations);
    setFilteredDonations(userDonations);

    setLoading(false);
  }, [decodedEmail]);

  // filter and search donations
  useEffect(() => {
    let filtered = [...donations];

    // search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(donation =>
        (donation.charity || "").toLowerCase().includes(lowerSearch) ||
        (donation.organization || "").toLowerCase().includes(lowerSearch) ||
        String(donation.donation || "").toLowerCase().includes(lowerSearch) ||
        String(donation.date || "").toLowerCase().includes(lowerSearch)
      );
    }

    // type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(donation => donation.type === selectedType);
    }

    // anonymous filter
    if (selectedAnonymous !== "all") {
      const isAnonymous = selectedAnonymous === "anonymous";
      filtered = filtered.filter(donation => donation.anonymous === isAnonymous);
    }


    // sort
    switch (sortBy) {
      case "date-desc": // newest first
        filtered.sort((a, b) => {
          const dateA = new Date(a.datetime || a.date);
          const dateB = new Date(b.datetime || b.date);
          return dateB.getTime() - dateA.getTime();
        });
        break;

      case "date-asc": // oldest first
        filtered.sort((a, b) => {
          const dateA = new Date(a.datetime || a.date);
          const dateB = new Date(b.datetime || b.date);
          return dateA.getTime() - dateB.getTime();
        });
        break;

      case "amount-desc":
        filtered.sort((a, b) => (b.amount || 0) - (a.amount || 0));
        break;
      case "amount-asc":
        filtered.sort((a, b) => (a.amount || 0) - (b.amount || 0));
        break;
      case "org-asc":
        filtered.sort((a, b) => a.charity.localeCompare(b.charity));
        break;
    }

    setFilteredDonations(filtered);
    setCurrentPage(1);
  }, [donations, searchTerm, selectedType, selectedAnonymous, sortBy]);

  // cal stats
  const totalDonated = donations.reduce((total, donation) => total + (donation.amount || 0), 0);
  const uniqueOrganizations = new Set(donations.map(d => d.organization)).size;
  const anonymousDonations = donations.filter(d => d.anonymous).length;

  // get donation types
  const donationTypes = [...new Set(donations.map(d => d.type).filter(Boolean))];

  // pagination cal
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, endIndex);

  // pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading donation history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-purple-800 mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Profile
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Donation History</h1>
            <p className="text-gray-600 mt-1">Complete donation record for {user?.username}</p>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donated</p>
                <p className="text-2xl font-bold text-green-600">${totalDonated.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-blue-600">{donations.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organizations</p>
                <p className="text-2xl font-bold text-purple-600">{uniqueOrganizations}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Anonymous</p>
                <p className="text-2xl font-bold text-gray-600">{anonymousDonations}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search charities and organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              {donationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* anonymous */}
            <select
              value={selectedAnonymous}
              onChange={(e) => setSelectedAnonymous(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Donations</option>
              <option value="anonymous">Anonymous Only</option>
              <option value="public">Public Only</option>
            </select>

            {/* sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
              <option value="org-asc">Charity A-Z</option>
            </select>
          </div>
        </div>

        {/* donation list */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                All Donations ({filteredDonations.length})
              </h3>
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredDonations.length)} of {filteredDonations.length}
              </div>
            </div>

            {filteredDonations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={24} className="text-gray-500" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No donations found</p>
                <p className="text-gray-500 text-sm">
                  {donations.length === 0
                    ? "You haven't made any donations yet."
                    : "Try adjusting your search or filter criteria."
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {currentDonations.map((donation, index) => (
                    <div key={startIndex + index} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-base font-medium text-grey-600">{donation.charity}</p>
                              <h4 className="text-sm text-gray-800">{donation.organization}</h4>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span>{donation.date}</span>
                                </div>
                                {donation.type && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {donation.type}
                                  </span>
                                )}
                                {donation.anonymous && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    <Shield size={12} />
                                    Anonymous
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {donation.donation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* pagination UI */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg border ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        } transition-colors`}
                    >
                      Previous
                    </button>

                    {/* page num */}
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isCurrentPage = pageNumber === currentPage;

                        const showPage =
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                        if (!showPage) {
                          if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                            return (
                              <span key={pageNumber} className="px-3 py-2 text-gray-400">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${isCurrentPage
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                              }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg border ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                        } transition-colors`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* summary */}
        {filteredDonations.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-blue-800 font-semibold text-lg mb-1">
                  Page {currentPage} of {totalPages}
                </h4>
                <p className="text-blue-700 text-sm">
                  Showing {currentDonations.length} donations • Total value: ${currentDonations.reduce((sum, d) => sum + (d.amount || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}