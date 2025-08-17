import Link from "next/link";

type Charity = {
    name: string;
    description: string;
    totalReceived: string;
    organizations: string[];
    fullDescription: string;
    image: string;
};

const charitiesData: Record<
    "unicef" | "red-cross" | "doctors-without-borders",
    Charity
> = {
    unicef: {
        name: "UNICEF",
        description:
            "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
        totalReceived: "$500",
        organizations: ["UNICEF USA", "UNICEF USA"],
        fullDescription:
            "UNICEF, the United Nations Children's Fund, works in the world's toughest places to reach the most disadvantaged children and adolescents, and to protect the rights of every child, everywhere. They work to save children's lives, defend their rights, and help them fulfill their potential, from early childhood through adolescence.",
        image: "https://placehold.co/800x400/cccccc/000000?text=UNICEF",
    },
    "red-cross": {
        name: "Red Cross",
        description:
            "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
        totalReceived: "$42",
        organizations: ["American Red Cross", "American Red Cross"],
        fullDescription:
            "The Red Cross, a part of the global Red Cross and Red Crescent network, provides humanitarian aid and services to communities in need, including disaster relief, blood donation services, and first aid training.",
        image: "https://placehold.co/800x400/cccccc/000000?text=Red+Cross",
    },
    "doctors-without-borders": {
        name: "Doctors Without Borders (MSF)",
        description:
            "Medical humanitarian organization delivering emergency aid to people affected by conflict, epidemics, disasters.",
        totalReceived: "$0",
        organizations: ["MSF USA", "MSF USA"],
        fullDescription:
            "Doctors Without Borders/Médecins Sans Frontières (MSF) is an international, independent medical humanitarian organization that delivers emergency aid to people affected by armed conflict, epidemics, natural disasters, and exclusion from healthcare.",
        image:
            "https://placehold.co/800x400/cccccc/000000?text=Doctors+Without+Borders",
    },
};

export default function CharityPage({ id }: { id?: string }) {
    const tempId =
        (id?.toLowerCase() as keyof typeof charitiesData) || "unicef";
    const charity = charitiesData[tempId];

    if (!charity) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800">Charity Not Found</h1>
                    <p className="mt-2 text-gray-600">
                        The page you are looking for does not exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-8 border-b border-gray-200">
                <div className="container mx-auto flex items-center">
                    <nav>
                        <Link href="/" className="text-blue-500">
                               &larr; Back
                        </Link>
                    </nav>

                    <span className="ml-auto text-xl font-bold">{charity.name}</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-12 px-8">
                <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
                    <img
                        src={charity.image}
                        alt={`${charity.name} banner`}
                        className="w-full rounded-2xl mb-8"
                    />
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                        {charity.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {charity.fullDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
                            <span className="font-semibold text-green-700">
                                Total Received:
                            </span>
                            <span className="text-2xl font-bold text-green-900">
                                {charity.totalReceived}
                            </span>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-700 mb-2">
                                Supporting Organizations:
                            </h4>
                            <ul className="text-sm text-blue-900 list-disc list-inside">
                                {charity.organizations.map((org, index) => (
                                    <li key={index}>{org}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
                        Donate to {charity.name}
                    </button>
                </div>
            </main>
        </div>
    );
}
