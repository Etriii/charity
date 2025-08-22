"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Tag, DollarSign } from "lucide-react";
import {
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import DonationModal from "../../../../components/DonationModal";

type Donation = {
  donor: string;
  amount: number;
  date: string;
  charity: string;
  organization: string;
  anonymous: boolean;
  datetime: string;
  email: string;
  type: string;
};

type CharityStats = {
  name: string;
  totalReceived: number;
  organizations: string[];
  fullDescription: string;
  image: string;
  logo: string;
  established: string;
  category: string;
  location: string;
  donors: number;
  avgGift: number;
  donationHistory: Donation[];
};

//mocak or static data
const staticCharityData: Record<string, Partial<CharityStats>> = {
  unicef: {
    name: "UNICEF",
    fullDescription:
      "UNICEF, the United Nations Children's Fund, works in the world's toughest places. United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
    image: "/images/UNICEFBG.jpg",
    logo: "/images/UNICEF.png",
    established: "1946",
    category: "Children & Education",
    location: "Global",
  },
  "red-cross": {
    name: "Red Cross",
    fullDescription:
      "The Red Cross, part of the global Red Cross and Red Crescent network, provides humanitarian aid. We are an International humanitarian movement providing emergency assistance, disaster relief, and health education.",
    image: "/images/RCbg1.jpg",
    logo: "/images/RC.jpg",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
  },
  "doctors-without-borders-(msf)": {
    name: "Doctors Without Borders (MSF)",
    fullDescription:
      "Doctors Without Borders/Médecins Sans Frontières (MSF) is an international, independent organization who delivers emergency aid at all crisis.",
    image: "/images/MSFB.avif",
    logo: "/images/MSF.png",
    established: "1971",
    category: "Healthcare",
    location: "Global",
  },
  "world-wildlife-fund-(wwf)": {
    name: "World Wildlife Fund (WWF)",
    fullDescription:
      "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
    image: "/images/WWFBG.jpg",
    logo: "/images/WWF.jpg",
    established: "1961",
    category: "Nature & Wildlife",
    location: "Global",
  },
  "salvation-army": {
    name: "Salvation Army",
    fullDescription:
      "International charitable organization providing relief, rehabilitation, and community support.",
    image: "/images/SABG.jpg",
    logo: "/images/SA.jpg",
    established: "1865",
    category: "Humanitarian Aid",
    location: "Global",
  },
  oxfam: {
    name: "Oxfam",
    fullDescription:
      "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
    image: "/images/OXFBG.jpg",
    logo: "/images/OXF.png",
    established: "1942",
    category: "Humanitarian Aid",
    location: "Global",
  },
};

// orgs mapping
const charityOrganizationsData: Record<string, string[]> = {
  "UNICEF": ["UNICEF USA", "UNICEF International"],
  "Red Cross": ["American Red Cross", "International Red Cross"],
  "Doctors Without Borders (MSF)": ["MSF USA", "MSF International"],
  "World Wildlife Fund (WWF)": ["WWF-US", "WWF International"],
  "Salvation Army": ["The Salvation Army USA", "The Salvation Army International"],
  "Oxfam": ["Oxfam America", "Oxfam International"],
};

interface PageProps {
  params: Promise<{ name: string; organizations?: string }>;
  onDonateClick?: () => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  isLoggedIn?: boolean;
}

export default function CharityPage({ 
  params, 
  onDonateClick, 
  setIsModalOpen, 
  isLoggedIn = false 
}: PageProps) {
  const { name } = use(params);
  const router = useRouter();
  const [charity, setCharity] = useState<CharityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const key = name.toLowerCase() as keyof typeof staticCharityData;
  const staticData = staticCharityData[key];

  const handleDonateClick = () => {
    if (onDonateClick) {
      onDonateClick();
    } else if (!isLoggedIn && setIsModalOpen) {
      setIsModalOpen(true);
    } else {
      setIsDonationModalOpen(true);
    }
  };

  useEffect(() => {
    if (!staticData) {
      setLoading(false);
      return;
    }

    const loadCharityData = () => {
      try {
        // Load donations from localStorage
        const donationsData = localStorage.getItem("donations");
        let allDonations: Donation[] = [];

        if (donationsData) {
          allDonations = JSON.parse(donationsData);
        }

        // filter donations
        const charityDonations = allDonations.filter(
          (donation) => donation.charity === staticData.name
        );

        // cal stats
        const totalReceived = charityDonations.reduce(
          (sum, donation) => sum + donation.amount,
          0
        );

        // get unique donors (email addresses)
        const uniqueDonors = new Set(charityDonations.map(d => d.email));
        const donorCount = uniqueDonors.size;

        // cal average gift
        const avgGift = donorCount > 0 ? Math.round(totalReceived / donorCount) : 0;

        // get orgs for this charity
        const organizations = charityOrganizationsData[staticData.name!] || [];

        // format donation history
        const donationHistory = charityDonations
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5) 
          .map(donation => ({
            ...donation,
            donor: donation.anonymous ? "Anonymous Donor" : `Donor ${donation.email.split('@')[0]}`
          }));

        // combines static and dynamic data
        const charityData: CharityStats = {
          name: staticData.name!,
          totalReceived,
          organizations,
          fullDescription: staticData.fullDescription!,
          image: staticData.image!,
          logo: staticData.logo!,
          established: staticData.established!,
          category: staticData.category!,
          location: staticData.location!,
          donors: donorCount,
          avgGift,
          donationHistory,
        };

        setCharity(charityData);
      } catch (error) {
        console.error("Error loading charity data:", error);
        // fallbacks
        if (staticData) {
          setCharity({
            name: staticData.name!,
            totalReceived: 0,
            organizations: charityOrganizationsData[staticData.name!] || [],
            fullDescription: staticData.fullDescription!,
            image: staticData.image!,
            logo: staticData.logo!,
            established: staticData.established!,
            category: staticData.category!,
            location: staticData.location!,
            donors: 0,
            avgGift: 0,
            donationHistory: [],
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadCharityData();

    // listens for donation updates from local storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "donations") {
        loadCharityData();
      }
    };

    const handleDonationAdded = () => {
      loadCharityData();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("donationAdded", handleDonationAdded);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("donationAdded", handleDonationAdded);
      };
    }
  }, [staticData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading charity profile...</p>
        </div>
      </div>
    );
  }

  if (!charity || !staticData) {
    return notFound();
  }

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push("/loggedin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* header */}
      <header className="bg-white shadow-sm py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex items-center">
          <button
            onClick={handleBack}
            className="text-gray-600 font-medium hover:text-purple-600 flex items-center gap-1"
          >
            &larr; Back
          </button>
          <span className="bg-gradient-to-br from-purple-500 to-pink-600 bg-clip-text text-transparent text-xl font-bold ml-auto">
            CharityFlow
          </span>
        </div>
      </header>

      <div className="relative w-full">
        {/* banner */}
        <div className="relative w-full h-96">
          <Image
            src={charity.image}
            alt={`${charity.name} banner`}
            fill
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* profile header */}
        <div className="absolute bottom-5 w-full">
          <div className="container mx-auto -mt-12 pl-15 px-8 flex items-center">
            <Image
              src={charity.logo}
              alt={`${charity.name} logo`}
              width={112}
              height={112}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              priority
            />
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-extrabold">{charity.name}</h1>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {charity.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" /> {charity.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Est. {charity.established}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <main className="container mx-auto py-12 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* mission / about */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              {charity.fullDescription}
            </p>

            {/* orgs */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">Partner Organizations</h3>
              {charity.organizations.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {charity.organizations.map((org, index) => (
                    <li key={index}>{org}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No partner organizations listed</p>
              )}
            </div>
          </div>

          {/* stats */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-bold mb-6 text-center">
              Donation Impact
            </h2>
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-green-600">
                ${charity.totalReceived.toLocaleString()}
              </p>
              <p className="text-gray-500">Total Raised</p>
            </div>

            {/* donors & avg gift */}
            <div className="flex gap-8 justify-center text-gray-600 mb-6">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-purple-600">
                  {charity.donors}
                </p>
                <p className="text-sm">Donors</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-pink-600">
                  ${charity.avgGift}
                </p>
                <p className="text-sm">Avg. Gift</p>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleDonateClick}
                className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow hover:from-purple-700 hover:to-pink-700 transition"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* donation history */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
            {charity.donationHistory.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {charity.donationHistory.map((donation, index) => (
                  <li
                    key={index}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{donation.donor}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(donation.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        to {donation.organization}
                      </p>
                    </div>
                    <p className="text-purple-600 font-bold">
                      ${donation.amount}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No donations yet. Be the first to donate!
              </p>
            )}
          </div>

          {/* info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quick Info</h2>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-600" />
                  <span className="font-medium">Founded</span>
                </div>
                <span>{charity.established}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-600" />
                  <span className="font-medium">Location</span>
                </div>
                <span>{charity.location}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-purple-600" />
                  <span className="font-medium">Category</span>
                </div>
                <span>{charity.category}</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-purple-600" />
                  <span className="font-medium">Total Raised</span>
                </div>
                <span className="text-green-600 font-bold">
                  ${charity.totalReceived.toLocaleString()}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* donation modal */}
      {isDonationModalOpen && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          charityName={charity.name}
          organizations={charity.organizations}
        />
      )}
    </div>
  );
}