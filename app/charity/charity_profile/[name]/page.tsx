"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import Image from "next/image";
import { Calendar, MapPin, Tag, DollarSign } from "lucide-react";
import {
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

type Donation = {
  donor: string;
  amount: number;
  date: string;
};

type Charity = {
  name: string;
  totalReceived: string;
  organizations: string[];
  fullDescription: string;
  image: string;
  profile_image: string;
  established: string;
  category: string;
  location: string;
  donors: number;
  avgGift: number;
  donationHistory: Donation[];
};

const charitiesData: Record<string, Charity> = {
  unicef: {
    name: "UNICEF",
    totalReceived: "$500",
    organizations: ["UNICEF USA", "UNICEF International"],
    fullDescription:
      "UNICEF, the United Nations Children's Fund, works in the world's toughest places. United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
    image: "/images/UNICEFBG.jpg",
    profile_image: "/images/UNICEF.png",
    established: "1946",
    category: "Children & Education",
    location: "Global",
    donors: 15,
    avgGift: 34,
    donationHistory: [
      { donor: "Emily Chen", amount: 200, date: "2024-04-05" },
      { donor: "John Smith", amount: 200, date: "2024-02-20" },
      { donor: "Jane Doe", amount: 100, date: "2023-12-15" },

    ],
  },

  "red-cross": {
    name: "Red Cross",
    totalReceived: "$100",
    organizations: ["American Red Cross", "International Red Cross"],
    fullDescription:
      "The Red Cross, part of the global Red Cross and Red Crescent network, provides humanitarian aid. We are an International humanitarian movement providing emergency assistance, disaster relief, and health education.",
    image: "/images/RCbg1.jpg",
    profile_image: "/images/RC.jpg",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 2,
    avgGift: 8,
    donationHistory: [
      { donor: "Michael Lee", amount: 75, date: "2023-11-10" },
      { donor: "Sarah Park", amount: 25, date: "2024-01-08" },
    ],
  },
  "doctors-without-borders-(msf)": {
    name: "Doctors Without Borders (MSF)",
    totalReceived: "$450",
    organizations: ["MSF USA", "MSF International"],
    fullDescription:
      "Doctors Without Borders/Médecins Sans Frontières (MSF) is an international, independent organization who delivers emergency aid at all crisis.",
    image: "/images/MSFB.avif",
    profile_image: "/images/MSF.png",
    established: "1971",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 3,
    avgGift: 4,
    donationHistory: [
      { donor: "Sheena Parky", amount: 150, date: "2024-01-20" },
      { donor: "Meisha Tiangco", amount: 50, date: "2024-01-08" },
      { donor: "Michael Lyson", amount: 250, date: "2023-11-10" },
    ],
  },
  "world-wildlife-fund-(wwf)": {
    name: "World Wildlife Fund (WWF)",
    totalReceived: "$150",
    organizations: ["MWWF US", "WWF International"],
    fullDescription:
      "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
    image: "/images/WWFBG.jpg",
    profile_image: "/images/WWF.jpg",
    established: "1961",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 2,
    avgGift: 3,
    donationHistory: [
      { donor: "Lyra Patinson", amount: 75, date: "2024-01-08" },
      { donor: "Mista Mone", amount: 75, date: "2023-11-10" },
    ],
  },
  "salvation-army": {
    name: "Salvation Army",
    totalReceived: "$210",
    organizations: ["The Salvation Army USA", "The Salvation Army International"],
    fullDescription:
      "International charitable organization providing relief, rehabilitation, and community support.",
    image: "/images/SABG.jpg",
    profile_image: "/images/SA.jpg",
    established: "1865",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 3,
    avgGift: 8,
    donationHistory: [
      { donor: "Michael Rey", amount: 110, date: "2025-1-10" },
      { donor: "Mint Park", amount: 40, date: "2024-01-08" },
      { donor: "Michael Jhonson", amount: 60, date: "2023-11-10" }
    ],
  },
  oxfam: {
    name: "Oxfam",
    totalReceived: "$402",
    organizations: ["Oxfam America", "Oxfam International"],
    fullDescription:
      "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
    image: "/images/OXFBG.jpg",
    profile_image: "/images/OXF.png",
    established: "1942",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 2,
    avgGift: 2,
    donationHistory: [
      { donor: "Sarah Lee", amount: 300, date: "2024-01-08" },
      { donor: "Michael Kim", amount: 102, date: "2023-11-10" }
    ],
  },
};

interface PageProps {
  params: Promise<{ name: string }>;
  // params: { name: string };
}

export default function CharityPage({ params }: PageProps) {
  const { name } = use(params); // ✅ unwrap with React.use()
  const key = name.toLowerCase() as keyof typeof charitiesData;
  const charity = charitiesData[key];
  const router = useRouter();

  if (!charity) {
    return notFound();
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // go to previous page
    } else {
      router.push("/loggedin"); // fallback route
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex items-center">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            &larr; Back
          </button>
          <span className="ml-auto text-xl font-bold">{charity.name}</span>
        </div>
      </header>

      <div className="relative w-full">
        {/* Banner */}
        <div className="relative w-full h-96">
          <Image
            src={charity.image}
            alt={`${charity.name} banner`}
            fill
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Profile header */}
        <div className="absolute bottom-5  w-full">
          <div className="container mx-auto -mt-12  pl-15 px-8 flex items-center">
            <Image
              src={charity.profile_image}
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
                  <CalendarIcon className="h-4 w-4" /> Est.{" "}
                  {charity.established}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto py-12 px-8">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Mission / About */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              {charity.fullDescription}
            </p>

            {/* Other Organizations */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">Other Organizations</h3>
              <ul className="list-disc list-inside text-gray-700">
                {charity.organizations.map((org, index) => (
                  <li key={index}>{org}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-bold mb-6 text-center">
              Donation Impact
            </h2>
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-green-600">
                {charity.totalReceived.toLocaleString()}
              </p>
              <p className="text-gray-500">Total Raised</p>
            </div>

            {/* Donors & Avg Gift */}
            <div className="flex gap-30 justify-center text-gray-600 mb-6">
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

            <div className="ml-auto text-center">
              <button className="bg-gradient-to-r cursor-pointer from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
                Donate Now
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donation History */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
            <ul className="divide-y divide-gray-200">
              {charity.donationHistory.map((donation, index) => (
                <li
                  key={index}
                  className="py-4 flex justify-between items-center "
                >
                  <div>
                    <p className="font-medium">{donation.donor}</p>
                    <p className="text-sm text-gray-500">{donation.date}</p>
                  </div>
                  <p className="text-purple-600 font-bold">
                    ${donation.amount}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info */}
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
                  {charity.totalReceived}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
