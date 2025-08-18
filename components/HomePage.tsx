import React from 'react';
import { CubeTransparentIcon, ClipboardDocumentCheckIcon, CheckCircleIcon as HeroCheckCircleIcon } from '@heroicons/react/24/solid';
import FeatureCard from './FeatureCard';
import CharityCard from './CharityCard';
import TestimonialCard from './TestimonialCard';
import { HomePageProps } from '../types';

const HomePage: React.FC<HomePageProps> = ({ setIsModalOpen  }) => {
  const features = [
    {
      title: "100% Transparent",
      description: "Every donation is recorded on the blockchain. See real-time totals for all charities and organizations.",
      icon: <CubeTransparentIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Direct or Random",
      description: "Choose specific organizations or let us randomly distribute your donation. Anonymous options available.",
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Track Your Impact",
      description: "View your complete donation history and see the cumulative impact of your generosity over time.",
      icon: <HeroCheckCircleIcon className="h-6 w-6 text-purple-500" />,
    },
  ];

  const charities = [
    {
      name: "UNICEF",
      description: "United Nations agency working in over 190 countries to protect children's rights and wellbeing.",
      received: 500,
      organizations: ["UNICEF USA", "UNICEF International"],
    },
    {
      name: "Red Cross",
      description: "International humanitarian movement providing emergency assistance, disaster relief, and health education.",
      received: 42,
      organizations: ["American Red Cross", "International Red Cross"],
    },
    {
      name: "Doctors Without Borders (MSF)",
      description: "Medical humanitarian organization delivering emergency aid to people affected by conflict, epidemics, disasters.",
      received: 0,
      organizations: ["MSF USA", "MSF International"],
    },
    {
      name: "World Wildlife Fund (WWF)",
      description: "Global nonprofit working to conserve nature and reduce the most pressing threats to biodiversity.",
      received: 0,
      organizations: ["WWF-US", "WWF International"],
    },
    {
      name: "Salvation Army",
      description: "International charitable organization providing relief, rehabilitation, and community support.",
      received: 0,
      organizations: ["The Salvation Army USA", "The Salvation Army International"],
    },
    {
      name: "Oxfam",
      description: "Global movement to end the injustice of poverty through humanitarian aid, advocacy, and development.",
      received: 0,
      organizations: ["Oxfam America", "Oxfam International"],
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
    <main className="container mx-auto pt-24 px-8">
      <section className="text-center mb-16 mt-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Donate with Complete <span className="text-blue-600">Transparency</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Track every donation in real-time. See exactly where your money goes and the impact you are making across 10 trusted charity organizations.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Donating
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Live Charity Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {charities.map((charity, index) => (
            <CharityCard key={index} {...charity} setIsModalOpen={setIsModalOpen} />
          ))}
        </div>
      </section>

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