import React from 'react';
import { CubeTransparentIcon, ClipboardDocumentCheckIcon, CheckCircleIcon as HeroCheckCircleIcon } from '@heroicons/react/24/solid';
import FeatureCard from './FeatureCard';
import CharityCard from './CharityCard';
import TestimonialCard from './TestimonialCard';
import { Message } from 'postcss';

interface HomePageProps {
  setIsModalOpen: (isOpen: boolean) => void;
setMainMessage?: (message: unknown) => void;
  isLoggedIn?: boolean;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Charity {
  name: string;
  description: string;
  received: number;
  organizations: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  imageSrc: string;
}

const HomePage: React.FC<HomePageProps> = ({ setIsModalOpen, setMainMessage, isLoggedIn = false }) => {
  const features: Feature[] = [
    { title: "100% Transparent", description: "Every donation is recorded on the blockchain. See real-time totals for all charities and organizations.", icon: <CubeTransparentIcon className="h-6 w-6 text-blue-500" /> },
    { title: "Direct or Random", description: "Choose specific organizations or let us randomly distribute your donation. Anonymous options available.", icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" /> },
    { title: "Track Your Impact", description: "View your complete donation history and see the cumulative impact of your generosity over time.", icon: <HeroCheckCircleIcon className="h-6 w-6 text-purple-500" /> },
  ];

  const charities: Charity[] = [
    { name: "UNICEF", description: "United Nations agency working in over 190 countries and territories to save children's lives, defend their rights, and help them fulfill their potential.", received: 500, organizations: ["UNICEF USA", "UNICEF International"] },
    { name: "Red Cross", description: "International humanitarian movement providing emergency assistance, disaster relief, and disaster preparedness education.", received: 42, organizations: ["American Red Cross", "International Red Cross"] },
    { name: "Doctors Without Borders (MSF)", description: "Medical humanitarian organization providing medical care to people affected by conflict, epidemics, disasters, or exclusion from healthcare.", received: 0, organizations: ["MSF USA", "MSF International"] },
    { name: "World Wildlife Fund (WWF)", description: "Global nonprofit working to conserve nature and reduce the most pressing threats to the diversity of life on Earth.", received: 0, organizations: ["WWF-US", "WWF International"] },
    { name: "Salvation Army", description: "International charitable organization that provides social services and operates thrift stores to fund its programs.", received: 0, organizations: ["The Salvation Army USA", "The Salvation Army International"] },
    { name: "Oxfam", description: "Global movement of people working together to end the injustice of poverty, inequality, and climate change.", received: 0, organizations: ["Oxfam America", "Oxfam International"] },
  ];

  const testimonials: Testimonial[] = [
    { quote: "Donating through this platform gave me peace of mind knowing exactly where my money went. The transparency is incredible!", author: "Jane Doe", title: "Satisfied Donor", imageSrc: "https://placehold.co/200x200/cccccc/000000?text=Jane" },
    { quote: "I love that I can see exactly where my money goes in real-time. It makes charitable giving feel more impactful and meaningful.", author: "John Smith", title: "Community Advocate", imageSrc: "https://placehold.co/200x200/cccccc/000000?text=John" },
    { quote: "A truly innovative approach to philanthropy. The blockchain technology ensures complete accountability and transparency.", author: "Emily Chen", title: "Philanthropy Expert", imageSrc: "https://placehold.co/200x200/cccccc/000000?text=Emily" },
  ];

  const handleDonateClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      console.log("Proceeding to donation flow...");
      if (setMainMessage) {
        setMainMessage({
          type: 'info',
          text: 'Donation flow coming soon!'
        });
      }
    }
  };

  return (
    <main className="container mx-auto pt-24 px-8">
      {/* hero */}
      <section className="text-center mb-16 mt-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Donate with Complete <span className="text-blue-600">Transparency</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Track every donation in real-time. See exactly where your money goes and the impact you are making across 6 trusted charity organizations.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDonateClick}
            className="bg-blue-600 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isLoggedIn ? 'Make a Donation' : 'Start Donating'}
          </button>
        </div>
      </section>

      {/* features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </section>

      {/* charities */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Live Charity Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>

      {/* testimonials */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Donors Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;