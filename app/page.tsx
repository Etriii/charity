import Link from 'next/link';
interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface CharityCardProps {
  name: string;
  description: string;
  received: number;
  organizations: string[];
}

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  imageSrc: string;
}


const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-center bg-blue-100 rounded-full h-12 w-12 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const CharityCard = ({ name, description, received, organizations }: CharityCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight pr-4">{name}</h3>
          <button className="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            2
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="space-y-3">
          <div className="flex items-center text-green-600 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Total Received <span className="ml-auto text-lg font-bold">${received}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h6m-6 4h6m-6 4h6m3 0H9" />
            </svg>
            <p className="text-sm text-gray-500">Supporting organizations:</p>
          </div>
          <ul className="text-sm text-gray-700 mt-1 list-disc list-inside">
            {organizations.map((org, index) => (
              <li key={index}>{org}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">

        <Link
          href={`/charity/charity_profile/${encodeURIComponent(
            name.toLowerCase().replace(/ /g, "-")
          )}`}
          className="text-blue-600 font-semibold text-sm hover:underline flex-1"
        >
          <button className="text-blue-600 font-semibold text-sm hover:underline flex-1 mx-10 mt-2.5">
            View Profile
          </button>
        </Link>

        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 flex-1">
          Donate Now
        </button>
      </div>
    </div>
  );
};

const TestimonialCard = ({ quote, author, title, imageSrc }: TestimonialProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <img
        src={imageSrc}
        alt={`${author}'s profile`}
        className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-white shadow-lg"
      />
      <p className="text-lg font-medium text-gray-800 mb-4 leading-relaxed italic">
        &quot;{quote}&quot;
      </p>
      <div className="text-sm font-semibold text-gray-900">{author}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
};


export default function Home() {
  const features = [
    {
      title: "100% Transparent",
      description: "Every donation is recorded on the blockchain. See real-time totals for all charities and organizations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.023 12.023 0 002.944 12c.319 2.516 1.157 4.885 2.474 6.941a12.023 12.023 0 008.582 3.056c2.516-.319 4.885-1.157 6.941-2.474a12.023 12.023 0 003.056-8.582 11.955 11.955 0 01-3.04-8.618z" />
        </svg>
      ),
    },
    {
      title: "Direct or Random",
      description: "Choose specific organizations or let us randomly distribute your donation. Anonymous options available.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Track Your Impact",
      description: "View your complete donation history and see the cumulative impact of your generosity over time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2z" />
        </svg>
      ),
    },
  ];

  const charities = [
    {
      name: "UNICEF",
      description: "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
      received: 500,
      organizations: ["UNICEF USA", "UNICEF USA"],
    },
    {
      name: "Red Cross",
      description: "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
      received: 42,
      organizations: ["American Red Cross", "American Red Cross"],
    },
    {
      name: "Doctors Without Borders (MSF)",
      description: "Medical humanitarian organization delivering emergency aid to people affected by conflict, epidemics, disasters.",
      received: 0,
      organizations: ["MSF USA", "MSF USA"],
    },
    {
      name: "World Wildlife Fund (WWF)",
      description: "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
      received: 0,
      organizations: ["WWF-US", "WWF-US"],
    },
    {
      name: "Salvation Army",
      description: "International charitable organization providing relief, rehabilitation, and community support.",
      received: 0,
      organizations: ["The Salvation Army USA", "The Salvation Army USA"],
    },
    {
      name: "Oxfam",
      description: "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
      received: 0,
      organizations: ["Oxfam America", "Oxfam America"],
    },
  ];

  const testimonials = [
    {
      quote: "Donating through this platform gave me peace of mind. The real-time tracking is a game changer.",
      author: "Jane Doe",
      title: "Satisfied Donor",
      imageSrc: "https://placehold.co/200x200/cccccc/000000?text=Jane",
    },
    {
      quote: "I love that I can see exactly where my money goes. It makes me feel more connected to the cause.",
      author: "John Smith",
      title: "Community Advocate",
      imageSrc: "https://placehold.co/200x200/cccccc/000000?text=John",
    },
    {
      quote: "A truly innovative approach to philanthropy. The transparency is exactly what the industry needs.",
      author: "Emily Chen",
      title: "Philanthropy Expert",
      imageSrc: "https://placehold.co/200x200/cccccc/000000?text=Emily",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-xl font-bold">DonateTransparently</span>
            <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 uppercase">Live Tracking</span>
          </div>
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">Create Account</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 px-8">

        {/* Hero Section */}
        <section className="text-center mb-16 mt-16">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Donate with Complete <span className="text-blue-600">Transparency</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Track every donation in real-time. See exactly where your money goes and the impact you are making across 10 trusted charity organizations.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
              Start Donating
            </button>

          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </section>

        {/* Live Charity Statistics Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Live Charity Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charities.map((charity, index) => (
              <CharityCard key={index} {...charity} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Donors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} DonateTransparently. All rights reserved.
      </footer>
    </div>
  );
}
