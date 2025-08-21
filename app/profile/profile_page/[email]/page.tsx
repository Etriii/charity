"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Pencil, ArrowLeft, User, DollarSign, Shield, Heart, Loader2, X } from "lucide-react";
import Link from "next/link";

type Donation = {
  organization: string;
  donation: string;
  date: string;
  type?: string;
  anonymous?: boolean;
};

interface User {
  username: string;
  email: string;
  password: string;
  id: string;
  createdAt: string;
}

type UserType = {
  name: string;
  email: string;
  profileImage: string;
  donationHistory: Donation[];
  readonly createdAt: string;
};

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

// get users from localstorage
const getUsersFromStorage = (): User[] => {
  if (typeof window !== 'undefined') {
    const usersJson = localStorage.getItem('donateTransparentlyUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  }
  return [];
};

const setUsersInStorage = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('donateTransparentlyUsers', JSON.stringify(users));
  }
};

const getCurrentSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('donateTransparentlyCurrentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
  return null;
};

const setCurrentSession = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('donateTransparentlyCurrentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('donateTransparentlyCurrentUser');
    }
  }
};

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

// set donations to localstorage
const setDonationsToStorage = (donations: DonationRecord[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('donations', JSON.stringify(donations));
  }
};

// get recent donations from localstorage
const getRecentDonationsFromStorage = (): DonationRecord[] => {
  if (typeof window !== 'undefined') {
    const recentDonationsJson = localStorage.getItem('recentDonations');
    if (recentDonationsJson) {
      try {
        const parsed = JSON.parse(recentDonationsJson);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        console.error('Error parsing recent donations from localStorage:', error);
        return [];
      }
    }
  }
  return [];
};

// set recent donations to localstorage
const setRecentDonationsToStorage = (donations: DonationRecord[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('recentDonations', JSON.stringify(donations));
  }
};

// update email in all donation records when user changes email
const updateDonationEmailRecords = (oldEmail: string, newEmail: string) => {
  // update donations
  const donations = getDonationsFromStorage();
  const updatedDonations = donations.map(donation => {
    if (donation.email?.toLowerCase() === oldEmail.toLowerCase()) {
      return { ...donation, email: newEmail };
    }
    return donation;
  });
  setDonationsToStorage(updatedDonations);

  // update recent donations
  const recentDonations = getRecentDonationsFromStorage();
  const updatedRecentDonations = recentDonations.map(donation => {
    if (donation.email?.toLowerCase() === oldEmail.toLowerCase()) {
      return { ...donation, email: newEmail };
    }
    return donation;
  });
  setRecentDonationsToStorage(updatedRecentDonations);
};

// get donations for the current logged in user by email
const getUserDonations = (userEmail: string): Donation[] => {
  const donations = getDonationsFromStorage();

  return donations
    .filter(donation => donation.email?.toLowerCase() === userEmail.toLowerCase())
    .map(donation => ({
      organization: donation.organization || donation.charity || 'Unknown Organization',
      donation: `$${donation.amount}`,
      date: donation.date || new Date(donation.datetime).toLocaleDateString(),
      type: donation.type,
      anonymous: donation.anonymous
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // sorts by date, newest first
};

// checks if email is unique (execpt current user)
const isEmailUnique = (email: string, currentUserEmail: string): boolean => {
  const users = getUsersFromStorage();
  return !users.some(user =>
    user.email.toLowerCase() === email.toLowerCase() &&
    user.email.toLowerCase() !== currentUserEmail.toLowerCase()
  );
};

export default function UserProfile(): JSX.Element {
  const router = useRouter();
  const params = useParams();

  const emailParam = params?.email as string;
  const decodedEmail = emailParam ? decodeURIComponent(emailParam) : '';

  // user state (editable)
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    profileImage: "/images/default_user.jpg",
    donationHistory: [],
    createdAt: new Date().toISOString(),

  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingField, setEditingField] = useState<"name" | "email" | null>(null);

  // temporary values while editing
  const [tempName, setTempName] = useState<string>("");
  const [tempEmail, setTempEmail] = useState<string>("");

  // confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // validation state
  const [emailValidationError, setEmailValidationError] = useState<string>("");

  // load user data from localStorage when component mounts
  useEffect(() => {
    if (!decodedEmail) {
      setError("No email parameter found in URL");
      setLoading(false);
      return;
    }

    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email.toLowerCase() === decodedEmail.toLowerCase());

    if (foundUser) {
      // get donation history for current logged in user
      const userDonations = getUserDonations(foundUser.email);

      setUser({
        name: foundUser.username,
        email: foundUser.email,
        profileImage: "/images/default_user.jpg",
        donationHistory: userDonations,
        createdAt: new Date(foundUser.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
      });
      setTempName(foundUser.username);
      setTempEmail(foundUser.email);
    } else {
      setError("User not found");
    }

    setLoading(false);
  }, [decodedEmail]);

  // date format = August 19, 2025
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(user.createdAt));

  useEffect(() => {
    if (user.donationHistory.length > 0) {
      const oldestDonationDate = user.donationHistory
        .map((d) => new Date(d.date))
        .sort((a, b) => a.getTime() - b.getTime())[0]
        .toISOString();

      setUser((prev) => ({
        ...prev,
        createdAt: oldestDonationDate,
      }));
    }
  }, [user.donationHistory]);

  // validate email uniqueness in realtime
  useEffect(() => {
    if (tempEmail && tempEmail !== user.email) {
      const trimmedEmail = tempEmail.trim();
      if (trimmedEmail && !isEmailUnique(trimmedEmail, user.email)) {
        setEmailValidationError("This email is already taken by another user");
      } else {
        setEmailValidationError("");
      }
    } else {
      setEmailValidationError("");
    }
  }, [tempEmail, user.email]);

  // cancels editing (revert temp values)
  const handleCancel = () => {
    setEditingField(null);
    setTempName(user.name);
    setTempEmail(user.email);
    setShowConfirm(false);
    setSaveMessage(null);
    setEmailValidationError("");
  };

  // validates form before showing confirmation
  const validateForm = (): boolean => {
    // check if name is empty
    if (!tempName.trim()) {
      setSaveMessage("Name cannot be empty");
      return false;
    }

    // check if email is empty
    if (!tempEmail.trim()) {
      setSaveMessage("Email cannot be empty");
      return false;
    }

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempEmail.trim())) {
      setSaveMessage("Please enter a valid email address");
      return false;
    }

    // check if email is unique (only if email is being changed)
    if (tempEmail.trim() !== user.email) {
      if (!isEmailUnique(tempEmail.trim(), user.email)) {
        setSaveMessage("This email is already taken by another user");
        return false;
      }
    }

    return true;
  };

  const handleSaveClick = () => {
    if (!validateForm()) {
      return;
    }

    setShowConfirm(true);
  };

  const confirmSave = () => {
    if (!validateForm()) {
      setShowConfirm(false);
      return;
    }

    // updates localstorage
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());

    if (userIndex !== -1) {
      const oldEmail = users[userIndex].email;
      const newEmail = tempEmail.trim();

      // updates the user
      users[userIndex] = {
        ...users[userIndex],
        username: tempName.trim(),
        email: newEmail
      };

      // saves back to localstorage
      setUsersInStorage(users);

      // update donation records if email changed
      if (oldEmail.toLowerCase() !== newEmail.toLowerCase()) {
        updateDonationEmailRecords(oldEmail, newEmail);
      }

      // updates current session if this is the current logged in user
      const currentUser = getCurrentSession();
      if (currentUser && currentUser.email.toLowerCase() === oldEmail.toLowerCase()) {
        setCurrentSession(users[userIndex]);
      }

      // updates local state with new donation history (now with updated email)
      const updatedDonations = getUserDonations(newEmail);
      setUser(prev => ({
        ...prev,
        name: tempName.trim(),
        email: newEmail,
        donationHistory: updatedDonations
      }));

      setSaveMessage("Profile updated successfully!");

      // If email was changed, redirect to new URL
      if (newEmail !== oldEmail) {
        setTimeout(() => {
          const encodedEmail = encodeURIComponent(newEmail);
          router.push(`/profile/profile_page/${encodedEmail}`);
        }, 1500);
      }
    } else {
      setSaveMessage("Error: User not found in storage");
    }

    setEditingField(null);
    setShowConfirm(false);
    setEmailValidationError("");

    setTimeout(() => setSaveMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Link>

        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <Link
              href="/"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // cal total donations
  const totalDonated = user.donationHistory.reduce((total, donation) => {
    const amount = parseFloat(donation.donation.replace('$', ''));
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);

  // calculate favorite organization
  const orgCounts = user.donationHistory.reduce((acc, donation) => {
    acc[donation.organization] = (acc[donation.organization] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteOrg = Object.keys(orgCounts).length > 0
    ? Object.keys(orgCounts).reduce((a, b) => orgCounts[a] > orgCounts[b] ? a : b)
    : "None yet";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Link>

        {saveMessage && (
          <div className={`mb-6 p-4 rounded-xl ${saveMessage.includes('Error') || saveMessage.includes('cannot') || saveMessage.includes('taken') || saveMessage.includes('valid')
            ? 'bg-red-50 border border-red-200 text-red-800'
            : 'bg-green-50 border border-green-200 text-green-800'
            } shadow-sm transition-opacity duration-300`}>
            {saveMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {/* profile card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    Profile
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Username</p>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Member Since</p>
                    <p className="font-medium text-gray-800">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* stats card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="text-red-500" size={20} />
                Your Impact
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Donated</span>
                  <span className="font-bold text-green-600">${totalDonated.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Donations Made</span>
                  <span className="font-bold text-blue-600">{user.donationHistory.length}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Favorite Cause</span>
                  <span className="font-bold text-purple-600 text-right max-w-[120px] truncate">{favoriteOrg}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {/* donation history card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <DollarSign size={20} className="text-blue-600" />
                  Donation History
                </h3>

                {user.donationHistory.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign size={24} className="text-gray-500" />
                    </div>
                    <p className="text-gray-600 text-lg mb-2">No donations yet</p>
                    <p className="text-gray-500 text-sm">Your donation history will appear here once you make a donation.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {user.donationHistory.slice(0, 5).map((donation, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{donation.organization}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">{donation.date}</span>
                                {donation.anonymous && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    <Shield size={12} />
                                    Anonymous
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-green-600">{donation.donation}</span>
                              <div className="mt-1">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {donation.type || 'Direct'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {user.donationHistory.length > 5 && (
                      <div className="mt-4 text-end">
                        <button
                          onClick={() => router.push(`/history/donation_history/${encodeURIComponent(user.email)}`)}
                          className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                        >
                          View All {user.donationHistory.length} Donations
                        </button>
                      </div>
                    )}

                    {/* total donated */}
                    <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <h4 className="text-blue-800 font-semibold mb-1">Total Donated</h4>
                          <p className="text-blue-700 text-sm">
                            {user.donationHistory.length} donation{user.donationHistory.length !== 1 ? 's' : ''} made
                          </p>
                        </div>
                        <div className="text-blue-900 font-bold text-2xl mt-2 sm:mt-0">
                          ${totalDonated.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* edit profile modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* modal */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-10">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEmailValidationError("");
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

            <div className="space-y-4">
              {/* username input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              {/* email input*/}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailValidationError
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                    }`}
                  placeholder="Enter your email address"
                />
                {emailValidationError && (
                  <p className="mt-1 text-sm text-red-600">{emailValidationError}</p>
                )}
              </div>
            </div>

            {/* actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleCancel();
                }}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditingField("name");
                  setIsModalOpen(false);
                  handleSaveClick();
                }}
                disabled={!!emailValidationError}
                className={`flex-1 px-4 py-2.5 rounded-lg transition-colors ${emailValidationError
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

      )}

      {/* confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pencil size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">Confirm Changes</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to save these changes to your profile?
              {tempEmail !== user.email && (
                <span className="block mt-2 text-sm text-amber-600 font-medium">
                  Note: Changing your email will redirect you to a new URL.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleCancel();
                }}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}