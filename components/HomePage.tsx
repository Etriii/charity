import React from "react";
import FeatureCard from "./FeatureCard";
import CharityCard from "./CharityCard";
import TestimonialCard from "./TestimonialCard";
import { Message } from "@/types";

interface HomePageProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setMainMessage?: (message: Message) => void;
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
  image: string;
  logo: string;
  category: string;
  established: number;
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  imageSrc: string;
}

const HomePage: React.FC<HomePageProps> = ({
  setIsModalOpen,
  setMainMessage,
  isLoggedIn = false,
}) => {
  const features: Feature[] = [
    {
      title: "Complete Transparency",
      description:
        "Every donation is recorded on the blockchain. See real-time totals for all charities and organizations.",
      icon: <span className="text-2xl">👁️</span>,
    },
    {
      title: "Secure Donations",
      description:
        "Your donations are processed securely with full encryption and fraud protection.",
      icon: <span className="text-2xl">🛡️</span>,
    },
    {
      title: "Direct or Random",
      description:
        "Choose specific organizations or let us randomly distribute your donation. Anonymous options available.",
      icon: <span className="text-2xl">👥</span>,
    },
    {
      title: "Impact Analytics",
      description:
        "View your complete donation history and see the cumulative impact of your generosity over time.",
      icon: <span className="text-2xl">📈</span>,
    },
  ];

  const charities: Charity[] = [
    {
      name: "UNICEF",
      description:
        "United Nations agency working in over 190 countries and territories to save children's lives, defend their rights, and help them fulfill their potential.",
      received: 40,
      organizations: ["UNICEF USA", "UNICEF International"],
      image: "/images/UNICEFBG.jpg",
      logo: "/images/UNICEF.png",
      category: "Children & Education",
      established: 1946,
    },
    {
      name: "Red Cross",
      description:
        "International humanitarian movement providing emergency assistance, disaster relief, and disaster preparedness education.",
      received: 75,
      organizations: ["American Red Cross", "International Red Cross"],
      image: "/images/RCbg1.jpg",
      logo: "/images/RC.jpg",
      category: "Humanitarian Aid",
      established: 1863,
    },
    {
      name: "Doctors Without Borders (MSF)",
      description:
        "Medical humanitarian organization providing medical care to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
      received: 50,
      organizations: ["MSF USA", "MSF International"],
      image: "/images/MSFB.avif",
      logo: "/images/MSF.png",
      category: "Humanitarian Aid",
      established: 1946,

    },
    {
      name: "World Wildlife Fund (WWF)",
      description:
        "Global nonprofit working to conserve nature and reduce the most pressing threats to the diversity of life on Earth.",
      received: 45,
      organizations: ["WWF-US", "WWF International"],
      image: "/images/WWFBG.jpg",
      logo: "/images/WWF.jpg",
      category: "Nature & WildLife Resources",
      established: 1961,

    },
    {
      name: "Salvation Army",
      description:
        "International charitable organization that provides social services and operates thrift stores to fund its programs.",
      received: 40,
      organizations: [
        "The Salvation Army USA",
        "The Salvation Army International",
      ],
      image: "/images/SABG.jpg",
      logo: "/images/SA.jpg",
      category: "Humanitarian Aid",
      established: 1865,

    },
    {
      name: "Oxfam",
      description:
        "Global movement of people working together to end the injustice of poverty, inequality, and climate change.",
      received: 60,
      organizations: ["Oxfam America", "Oxfam International"],
      image: "/images/OXFBG.jpg",
      logo: "/images/OXF.png",
      category: "Humanitarian Aid",
      established: 1942,

    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote:
        "Donating through this platform gave me peace of mind knowing exactly where my money went. The transparency is incredible!",
      author: "Jane Doe",
      title: "Satisfied Donor",
      imageSrc: "/images/default_user.jpg",
    },
    {
      quote:
        "I love that I can see exactly where my money goes in real-time. It makes charitable giving feel more impactful and meaningful.",
      author: "John Smith",
      title: "Community Advocate",
      imageSrc: "/images/default_user.jpg",
    },
    {
      quote:
        "A truly innovative approach to philanthropy. The blockchain technology ensures complete accountability and transparency.",
      author: "Emily Chen",
      title: "Philanthropy Expert",
      imageSrc: "/images/default_user.jpg",
    },
  ];

  const handleDonateClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      console.log("Proceeding to donation flow...");
      if (setMainMessage) {
        setMainMessage({
          type: "info",
          text: "Donation flow coming soon!",
        });
      }
    }
  };

  return (
    <main className="container mx-auto pt-24 px-8">
      {/* hero */}
      <section className="text-center mb-16 mt-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Donate with Complete{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-600">
            Transparency
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Track every donation in real-time. See exactly where your money goes
          and the impact you are making across 6 trusted charity organizations.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDonateClick}
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isLoggedIn ? "Make a Donation" : "Start Donating"}
          </button>
        </div>
      </section>

      {/* stats section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-4xl">🎁</span>
            <h3 className="text-2xl font-bold">$200k+</h3>
            <p className="text-gray-600">Total Donated</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">👥</span>
            <h3 className="text-2xl font-bold">564+</h3>
            <p className="text-gray-600">Donors</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">❤️</span>
            <h3 className="text-2xl font-bold">6</h3>
            <p className="text-gray-600">Charities</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">👁️</span>
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-gray-600">Transparency</p>
          </div>
          <br></br>
        </div>
      </section>

      {/* Why Choose CharityFlow */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose CharityFlow?
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Built for transparency, security, and maximum impact
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* charities */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Charities
        </h2>
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
              image={charity.image}
              logo={charity.logo}
              established={charity.established}
              category={charity.category}
            />
          ))}
        </div>
      </section>

      {/* testimonials */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Donors Say
        </h2>
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
