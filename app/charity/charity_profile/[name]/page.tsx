import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

type Donation = {
  donor: string;
  amount: number;
  date: string;
};

type Charity = {
  name: string;
  description: string;
  totalReceived: string;
  organizations: string[];
  fullDescription: string;
  image: string;
  established: string;
  category: string;
  location: string;
  donors: number;
  avgGift: number;
  donationHistory: Donation[];
};

// const charitiesData: Record<
//   "unicef" | "red-cross" | "doctors-without-borders-(msf)" | "world-wildlife-fund-(wwf)" | "salvation-army" | "oxfam",
//   Charity
// > = {
const charitiesData: Record<string, Charity> = {
  unicef: {
    name: "UNICEF",
    description:
      "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
    totalReceived: "$500",
    organizations: ["UNICEF USA", "UNICEF USA"],
    fullDescription:
      "UNICEF, the United Nations Children's Fund, works in the world's toughest places...",
    image: "https://placehold.co/800x400/cccccc/000000?text=UNICEF",
    established: "1946",
    category: "Children & Education",
    location: "Global",
    donors: 15,
    avgGift: 34,
    donationHistory: [
      { donor: "Jane Doe", amount: 100, date: "2023-12-15" },
      { donor: "John Smith", amount: 200, date: "2024-02-20" },
      { donor: "Emily Chen", amount: 200, date: "2024-04-05" },
    ],
  },

  "red-cross": {
    name: "Red Cross",
    description:
      "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
    totalReceived: "$42",
    organizations: ["American Red Cross", "American Red Cross"],
    fullDescription:
      "The Red Cross, part of the global Red Cross and Red Crescent network, provides humanitarian aid...",
    image: "https://placehold.co/800x400/cccccc/000000?text=Red+Cross",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 5,
    avgGift: 8,
    donationHistory: [c
      { donor: "Michael Lee", amount: 20, date: "2023-11-10" },
      { donor: "Sarah Park", amount: 22, date: "2024-01-08" },
    ],
  },
  "doctors-without-borders-(msf)": {
    name: "Doctors Without Borders (MSF)",
    description:
      "Medical humanitarian organization delivering emergency aid...",
    totalReceived: "$0",
    organizations: ["MSF USA", "MSF USA"],
    fullDescription:
      "Doctors Without Borders/Médecins Sans Frontières (MSF) is an international, independent...",
    image:
      "https://placehold.co/800x400/cccccc/000000?text=Doctors+Without+Borders",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 5,
    avgGift: 8,
    donationHistory: [
      { donor: "Michael Lee", amount: 20, date: "2023-11-10" },
      { donor: "Sarah Park", amount: 22, date: "2024-01-08" },
    ],
  },
  "world-wildlife-fund-(wwf)": {
    name: "World Wildlife Fund (WWF)",
    description:
      "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
    totalReceived: "$0",
    organizations: ["MWWF US", "WWF US"],
    fullDescription:
      "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
    image:
      "https://placehold.co/800x400/cccccc/000000?text=World+Wildlife+Fund",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 5,
    avgGift: 8,
    donationHistory: [
      { donor: "Michael Lee", amount: 20, date: "2023-11-10" },
      { donor: "Sarah Park", amount: 22, date: "2024-01-08" },
    ],
  },
  "salvation-army": {
    name: "Salvation Army",
    description:
      "International charitable organization providing relief, rehabilitation, and community support.",
    totalReceived: "$0",
    organizations: ["The Salvation Army USA", "The Salvation Army USA"],
    fullDescription:
      "International charitable organization providing relief, rehabilitation, and community support.",
    image: "https://placehold.co/800x400/cccccc/000000?text=Salvation+Army",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 5,
    avgGift: 8,
    donationHistory: [
      { donor: "Michael Lee", amount: 20, date: "2023-11-10" },
      { donor: "Sarah Park", amount: 22, date: "2024-01-08" },
    ],
  },
  oxfam: {
    name: "Oxfam",
    description:
      "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
    totalReceived: "$0",
    organizations: ["Oxfam America", "Oxfam International"],
    fullDescription:
      "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
    image: "https://placehold.co/800x400/cccccc/000000?text=Oxfam",
    established: "1863",
    category: "Humanitarian Aid",
    location: "Global",
    donors: 5,
    avgGift: 8,
    donationHistory: [
      { donor: "Michael Lee", amount: 20, date: "2023-11-10" },
      { donor: "Sarah Park", amount: 22, date: "2024-01-08" },
    ],
  },
};

interface PageProps {
  params: { name: string };
}

export default function CharityPage({ params }: PageProps) {
  const key = params.name.toLowerCase() as keyof typeof charitiesData;
  const charity = charitiesData[key];

  if (!charity) {
    return notFound();
  }
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex items-center">
          <Link href="/loggedin" className="text-blue-600 hover:underline">
            &larr; Back
          </Link>
          <span className="ml-auto text-xl font-bold">{charity.name}</span>
        </div>
      </header>

      {/* Banner */}
      <div className="relative w-full h-64">
        <img
          src={charity.image}
          alt={`${charity.name} banner`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile header */}
      <div className="container mx-auto -mt-12 px-8 flex items-center">
        <img
          src="https://placehold.co/120x120"
          alt={`${charity.name} logo`}
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-extrabold">{charity.name}</h1>
          <div className="flex gap-4 text-gray-600 mt-2 text-sm">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
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
        <div className="ml-auto">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
            Donate Now
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto py-12 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Mission / About */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">{charity.fullDescription}</p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-bold mb-6">Donation Impact</h2>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-green-600">
                ${charity.totalReceived.toLocaleString()}
              </p>
              <p className="text-gray-500">Total Raised</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="text-center">
                <p className="text-purple-600 font-bold">{charity.donors}</p>
                <p>Donors</p>
              </div>
              <div className="text-center">
                <p className="text-pink-600 font-bold">${charity.avgGift}</p>
                <p>Avg. Gift</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="bg-white rounded-2xl shadow p-8 mt-10">
          <h2 className="text-2xl font-bold mb-6">Donation History</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 text-sm border-b">
                <th className="py-3">Donor</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {charity.donationHistory.map((donation, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">{donation.donor}</td>
                  <td className="py-3 text-green-600 font-medium">${donation.amount}</td>
                  <td className="py-3">{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
//       {/* header */}
//       <header className="bg-white shadow-sm py-4 px-8 border-b border-gray-200">
//         <div className="container mx-auto flex items-center">
//           <Link href="/loggedin" className="text-blue-500 hover:underline">
//             &larr; Back
//           </Link>
//           <span className="ml-auto text-xl font-bold">{charity.name}</span>
//         </div>
//       </header>

//       {/* main */}
//       <main className="container mx-auto py-12 px-8">
//         <div className="bg-white rounded-2xl p-8 shadow-md border">
//           <img
//             src={charity.image}
//             alt={`${charity.name} banner`}
//             className="w-full rounded-2xl mb-8"
//           />
//           <h1 className="text-4xl font-extrabold mb-4">{charity.name}</h1>
//           <p className="text-lg text-gray-600 mb-8">
//             {charity.fullDescription}
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-green-50 rounded-lg p-4 flex justify-between">
//               <span className="font-semibold text-green-700">
//                 Total Received:
//               </span>
//               <span className="text-2xl font-bold text-green-900">
//                 {charity.totalReceived}
//               </span>
//             </div>
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h4 className="font-semibold text-blue-700 mb-2">
//                 Supporting Organizations:
//               </h4>
//               <ul className="text-sm text-blue-900 list-disc list-inside">
//                 {charity.organizations.map((org, index) => (
//                   <li key={index}>{org}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <button className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-700 transition-colors">
//             Donate to {charity.name}
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }
