/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from 'react';
import {
    UserGroupIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import {
    HeartIcon as HeartSolid,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import CharityCard from './CharityCard';
import { Message } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import DashboardTab from './DashboardTab';

interface LoggedInHomePageProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setMainMessage: Dispatch<SetStateAction<Message>>;
    userName?: string;
    userEmail?: string;
}

interface Donation {
    amount: number;
    charity: string;
    organization: string;
    anonymous: boolean;
    date: string;
    datetime: string;
    email: string;
    type: string;
}

const LoggedInHomePage: React.FC<LoggedInHomePageProps> = ({
    setIsModalOpen,
    setMainMessage,
    userName: defaultName = "Micah",
    userEmail: defaultEmail = "micah@gmail.com"
}) => {
    const [activeTab, setActiveTab] = useState<'explore' | 'dashboard'>('explore');
    const [userDonations, setUserDonations] = useState<Donation[]>([]);
    const [userStats, setUserStats] = useState({
        totalDonated: 0.00,
        donationsMade: 0,
        charitiesSupported: 0,
        memberSince: ""
    });

    // state of user identity
    const [userName, setUserName] = useState(defaultName);
    const [userEmail, setUserEmail] = useState(defaultEmail);

    const isLoggedIn = true;

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    // function loads donations filtered by current logged in user email
    const loadUserData = () => {
        try {
            const donationsData = localStorage.getItem("donations");
            if (donationsData) {
                const allDonations: Donation[] = JSON.parse(donationsData);

                const userSpecificDonations = allDonations.filter(
                    (donation) => donation.email === userEmail
                );

                setUserDonations(userSpecificDonations);

                const totalDonated = userSpecificDonations.reduce(
                    (sum, d) => sum + d.amount,
                    0
                );

                const uniqueCharities = new Set(
                    userSpecificDonations.map((d) => d.charity)
                );

                let memberSince = today;
                if (userSpecificDonations.length > 0) {
                    const earliestDate = userSpecificDonations.reduce(
                        (earliest, d) =>
                            new Date(d.date) < new Date(earliest)
                                ? d.date
                                : earliest,
                        userSpecificDonations[0].date
                    );
                    memberSince = earliestDate;
                }

                setUserStats({
                    totalDonated,
                    donationsMade: userSpecificDonations.length,
                    charitiesSupported: uniqueCharities.size,
                    memberSince,
                });
            } else {
                setUserStats({
                    totalDonated: 0,
                    donationsMade: 0,
                    charitiesSupported: 0,
                    memberSince: today,
                });
            }
        } catch (error) {
            console.error("Error loading donations from localStorage:", error);
            setUserStats({
                totalDonated: 0,
                donationsMade: 0,
                charitiesSupported: 0,
                memberSince: today,
            });
        }
    };

    useEffect(() => {
        // loads current user who is logged in
        const loadCurrentUser = () => {
            const storedUser = localStorage.getItem(
                "donateTransparentlyCurrentUser"
            );
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUserEmail(parsedUser?.email || defaultEmail);
                    setUserName(parsedUser?.username || defaultName);
                } catch (err) {
                    console.error("Error parsing current user:", err);
                }
            } else {
                setUserEmail(defaultEmail);
                setUserName(defaultName);
            }
        };

        loadCurrentUser();
        loadUserData();

        window.addEventListener("storage", loadCurrentUser);
        window.addEventListener("storage", (e) => {
            if (e.key === "donations") loadUserData();
        });
        window.addEventListener("donationAdded", loadUserData);

        return () => {
            window.removeEventListener("storage", loadCurrentUser);
            window.removeEventListener("storage", (e) => {
                if (e.key === "donations") loadUserData();
            });
            window.removeEventListener("donationAdded", loadUserData);
        };
    }, [defaultEmail, defaultName, userEmail, today]);

    // cal charity stats
    const getCharityStats = (charityName: string) => {
        try {
            const donationsData = localStorage.getItem('donations');
            if (donationsData) {
                const allDonations: Donation[] = JSON.parse(donationsData);
                const charityDonations = allDonations.filter(
                    donation => donation.charity === charityName
                );
                
                const totalReceived = charityDonations.reduce(
                    (sum, donation) => sum + donation.amount, 0
                );
                
                const uniqueOrganizations = new Set(
                    charityDonations.map(donation => donation.organization)
                );
                
                return {
                    received: totalReceived,
                    organizations: Array.from(uniqueOrganizations)
                };
            }
        } catch (error) {
            console.error('Error calculating charity stats:', error);
        }
        
        return { received: 0, organizations: [] };
    };

    const charities = [
        {
            name: "UNICEF",
            description: "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
            ...getCharityStats("UNICEF"),
            likes: 2
        },
        {
            name: "Red Cross",
            description: "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
            ...getCharityStats("Red Cross"),
            likes: 2
        },
        {
            name: "Doctors Without Borders (MSF)",
            description: "Medical humanitarian organization delivering emergency aid to people affected by conflict, epidemics, disasters.",
            ...getCharityStats("Doctors Without Borders (MSF)"),
            likes: 2
        },
        {
            name: "World Wildlife Fund (WWF)",
            description: "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
            ...getCharityStats("World Wildlife Fund (WWF)"),
            likes: 2
        },
        {
            name: "Salvation Army",
            description: "International charitable organization providing relief, rehabilitation, and community support.",
            ...getCharityStats("Salvation Army"),
            likes: 2
        },
        {
            name: "Oxfam",
            description: "Global movement to end the injustice of poverty through humanitarian aid, advocacy, development.",
            ...getCharityStats("Oxfam"),
            likes: 2
        },
    ];

    const ExploreTab = () => (
        <div className="space-y-8">
            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <ArrowTrendingUpIcon className="h-8 w-8 text-green-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Total Donated</p>
                            <p className="text-2xl font-bold text-green-600">${userStats.totalDonated.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <UserGroupIcon className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Active Charities</p>
                            <p className="text-2xl font-bold text-blue-600">{charities.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <HeartSolid className="h-8 w-8 text-purple-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Organizations</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {charities.reduce((total, charity) => total + charity.organizations.length, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <EyeIcon className="h-8 w-8 text-orange-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Your Donations</p>
                            <p className="text-2xl font-bold text-orange-600">{userStats.donationsMade}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* choosing charity section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Choose a Charity to Support</h2>
                    <p className="text-sm text-gray-500">{charities.length} charities • Real-time donation tracking</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {charities.map((charity, index) => (
                        <CharityCard
                            key={index}
                            name={charity.name}
                            description={charity.description}
                            received={charity.received}
                            organizations={charity.organizations}
                            setIsModalOpen={setIsModalOpen}
                            isLoggedIn={isLoggedIn}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto pt-24 px-8 min-h-screen">
            {/* nav tabs */}
            <div className="flex space-x-8 mb-8">
                <button
                    onClick={() => setActiveTab('explore')}
                    className={`pb-2 font-medium transition-colors ${activeTab === 'explore'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Explore Charities
                </button>
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`pb-2 font-medium transition-colors ${activeTab === 'dashboard'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    My Dashboard
                </button>
            </div>

            {/* tab content */}
            {activeTab === 'explore' ? <ExploreTab /> : <DashboardTab userEmail={userEmail} />}
        </div>
    );
};

export default LoggedInHomePage;