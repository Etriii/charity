import Link from "next/link";
import { notFound } from "next/navigation";

type Charity = {
  name: string;
  description: string;
  totalReceived: string;
  organizations: string[];
  fullDescription: string;
  image: string;
};

const charitiesData: Record<
  "unicef" | "red-cross" | "doctors-without-borders-(msf)" | "world-wildlife-fund-(wwf)" | "salvation-army" | "oxfam",
  Charity
> = {
  unicef: {
    name: "UNICEF",
    description: "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
    totalReceived: "$500",
    organizations: ["UNICEF USA", "UNICEF USA"],
    fullDescription: "UNICEF, the United Nations Children's Fund, works in the world's toughest places...",
    image: "https://placehold.co/800x400/cccccc/000000?text=UNICEF",
  },
  "red-cross": {
    name: "Red Cross",
    description: "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
    totalReceived: "$42",
    organizations: ["American Red Cross", "American Red Cross"],
    fullDescription: "The Red Cross, part of the global Red Cross and Red Crescent network, provides humanitarian aid...",
    image: "https://placehold.co/800x400/cccccc/000000?text=Red+Cross",
  },
  "doctors-without-borders-(msf)": {
    name: "Doctors Without Borders (MSF)",
    description: "Medical humanitarian organization delivering emergency aid...",
    totalReceived: "$0",
    organizations: ["MSF USA", "MSF USA"],
    fullDescription: "Doctors Without Borders/Médecins Sans Frontières (MSF) is an international, independent...",
    image: "https://placehold.co/800x400/cccccc/000000?text=Doctors+Without+Borders",
  },
  "world-wildlife-fund-(wwf)": {
    name: "World Wildlife Fund (WWF)",
    description: "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
    totalReceived: "$0",
    organizations: ["MWWF US", "WWF US"],
    fullDescription: "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
    image: "https://placehold.co/800x400/cccccc/000000?text=World+Wildlife+Fund",
  },
  "salvation-army": {
    name: "Salvation Army",
    description: "International charitable organization providing relief, rehabilitation, and community support.",
    totalReceived: "$0",
    organizations: ["The Salvation Army USA", "The Salvation Army USA"],
    fullDescription: "International charitable organization providing relief, rehabilitation, and community support.",
    image: "https://placehold.co/800x400/cccccc/000000?text=Salvation+Army",
  },
  oxfam: {
    name: "Oxfam",
    description: "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
    totalReceived: "$0",
    organizations: ["Oxfam America", "Oxfam International"],
    fullDescription: "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
    image: "https://placehold.co/800x400/cccccc/000000?text=Oxfam",
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
      {/* header */}
      <header className="bg-white shadow-sm py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex items-center">
          <Link href="/loggedin" className="text-blue-500 hover:underline">
            &larr; Back
          </Link>
          <span className="ml-auto text-xl font-bold">{charity.name}</span>
        </div>
      </header>

      {/* main */}
      <main className="container mx-auto py-12 px-8">
        <div className="bg-white rounded-2xl p-8 shadow-md border">
          <img
            src={charity.image}
            alt={`${charity.name} banner`}
            className="w-full rounded-2xl mb-8"
          />
          <h1 className="text-4xl font-extrabold mb-4">{charity.name}</h1>
          <p className="text-lg text-gray-600 mb-8">{charity.fullDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-4 flex justify-between">
              <span className="font-semibold text-green-700">Total Received:</span>
              <span className="text-2xl font-bold text-green-900">{charity.totalReceived}</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 mb-2">Supporting Organizations:</h4>
              <ul className="text-sm text-blue-900 list-disc list-inside">
                {charity.organizations.map((org, index) => (
                  <li key={index}>{org}</li>
                ))}
              </ul>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-700 transition-colors">
            Donate to {charity.name}
          </button>
        </div>
      </main>
    </div>
  );
}
