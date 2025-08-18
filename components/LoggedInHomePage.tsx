import React, { useState } from 'react';
import {
    HeartIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    EyeIcon,
    ArrowPathIcon,
    CalendarIcon,
    GiftIcon
} from '@heroicons/react/24/outline';
import {
    HeartIcon as HeartSolid,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import CharityCard from './CharityCard';
import { Message } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import DashboardTab from './DashboardTab';
import Link from 'next/link';

interface LoggedInHomePageProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setMainMessage: Dispatch<SetStateAction<Message>>;
    userName?: string;
}

const LoggedInHomePage: React.FC<LoggedInHomePageProps> = ({
    setIsModalOpen,
    setMainMessage,
    userName = "Micah"
}) => {
    const [activeTab, setActiveTab] = useState<'explore' | 'dashboard'>('explore');

    // mock data
    const userStats = {
        totalDonated: 5178.00,
        donationsMade: 4,
        charitiesSupported: 2,
        memberSince: "8/17/2025"
    };


    const charities = [
        {
            name: "UNICEF",
            description: "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
            received: 500,
            organizations: ["UNICEF USA", "UNICEF International"],
            likes: 2
        },
        {
            name: "Red Cross",
            description: "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
            received: 42,
            organizations: ["American Red Cross", "International Red Cross"],
            likes: 2
        },
        {
            name: "Doctors Without Borders (MSF)",
            description: "Medical humanitarian organization delivering emergency aid to people affected by conflict, epidemics, disasters.",
            received: 0,
            organizations: ["MSF USA", "MSF International"],
            likes: 2
        },
        {
            name: "World Wildlife Fund (WWF)",
            description: "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
            received: 0,
            organizations: ["WWF-US", "WWF International"],
            likes: 2
        },
        {
            name: "Salvation Army",
            description: "International charitable organization providing relief, rehabilitation, and community support.",
            received: 0,
            organizations: ["The Salvation Army USA", "The Salvation Army International"],
            likes: 2
        },
        {
            name: "Oxfam",
            description: "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
            received: 0,
            organizations: ["Oxfam America", "Oxfam International"],
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
                            <p className="text-2xl font-bold text-blue-600">10</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <HeartSolid className="h-8 w-8 text-purple-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Organizations</p>
                            <p className="text-2xl font-bold text-purple-600">10</p>
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
                    <p className="text-sm text-gray-500">10 charities • Real-time donation tracking</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {charities.map((charity, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{charity.name}</h3>
                                <div className="flex items-center text-gray-400">
                                    <HeartIcon className="h-5 w-5 mr-1" />
                                    <span className="text-sm">{charity.likes}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{charity.description}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                                        Total Received
                                    </span>
                                    <span className="font-bold text-green-600">${charity.received}</span>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                                            Organizations
                                        </span>
                                        <span className="text-sm font-medium">{charity.organizations.length}</span>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500">Supporting organizations:</p>
                                        {charity.organizations.map((org, orgIndex) => (
                                            <div key={orgIndex} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-700">{org}</span>
                                                <span className="text-green-600 font-medium">${charity.received}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Link
                                    href={{
                                        pathname: "/charity/charity_profile/[name]",
                                        query: { name: charity.name },
                                    }}
                                    as={`/charity/charity_profile/${encodeURIComponent(charity.name)}`}
                                    className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
                                >
                                    View Profile
                                </Link>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    <DashboardTab />

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
            {activeTab === 'explore' ? <ExploreTab /> : <DashboardTab />}
        </div>
    );
};

export default LoggedInHomePage;