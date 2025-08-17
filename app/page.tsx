"use client";

import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { MouseEvent as ReactMouseEvent, FormEvent as ReactFormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRightOnRectangleIcon, CubeTransparentIcon, ClipboardDocumentCheckIcon, UserPlusIcon as HeroUserPlusIcon, CheckCircleIcon as HeroCheckCircleIcon, XMarkIcon, XCircleIcon as HeroXCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {

      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div
        ref={modalContentRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-auto p-12"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>

  );
};

type Message = { type: 'success' | 'error' | 'info'; text: string } | null;

const DonationAuthContent: React.FC<{ onClose: () => void; onLoginSuccess: () => void }> = ({ onClose, onLoginSuccess }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [identity, setIdentity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register" | null>(null);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [registerUsername, setRegisterUsername] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    const connectToNetwork = () => {
      setTimeout(() => {
        setConnected(true);
        setIdentity('donor-1234');
      }, 1000);
    };

    if (!connected) {
      connectToNetwork();
    }
  }, [connected]);

  const handleLogin = (e: ReactFormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setMessage(null);

    setTimeout(() => {
      const mockLoginSuccess = true;
      if (mockLoginSuccess) {
        setConnected(true);
        setIdentity(`donor-logged-in-${Math.random().toString(36).substring(4)}`);
        setMessage({ type: 'success', text: 'You have successfully logged in!' });
        onLoginSuccess();
        setTimeout(() => onClose(), 2000);
      } else {
        setMessage({ type: 'error', text: 'Login failed. Please check your email.' });
      }
      setLoginLoading(false);
    }, 1500);
  };

  // handles registration submission
  const handleRegister = (e: ReactFormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setMessage(null);

    setTimeout(() => {
      const mockRegisterSuccess = true;
      if (mockRegisterSuccess) {
        setConnected(true);
        setIdentity(`donor-registered-${Math.random().toString(36).substring(4)}`);
        setMessage({ type: 'success', text: 'Account created successfully! Welcome.' });
        onLoginSuccess();
        setTimeout(() => onClose(), 2000);
      } else {
        setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
      }
      setRegisterLoading(false);
    }, 1500);
  };

  // icons
  const LogInIcon = () => <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-700" />;
  const UserPlusIcon = () => <HeroUserPlusIcon className="w-5 h-5 text-blue-500" />;
  const CheckCircleIcon = () => <HeroCheckCircleIcon className="w-5 h-5 text-green-500" />;
  const XCircleIcon = () => <HeroXCircleIcon className="w-5 h-5 text-red-500" />;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-xl font-bold leading-none tracking-tight text-black">Welcome to DonateTransparently</h2>
      </div>

      <div className="space-y-4 mt-6">
        {message && (
          <div className={`rounded-xl border-2 ${message.type === 'success' ? 'border-green-400 bg-green-50' : message.type === 'error' ? 'border-red-400 bg-red-50' : 'border-blue-400 bg-blue-50'}`}>
            <div className="p-4 flex items-center space-x-2">
              {message.type === 'success' ? (
                <CheckCircleIcon />
              ) : message.type === 'error' ? (
                <XCircleIcon />
              ) : null}
              <p className={`text-sm ${message.type === 'success' ? 'text-green-800' : message.type === 'error' ? 'text-red-800' : 'text-blue-800'}`}>
                {message.text}
              </p>
            </div>
          </div>
        )}
        {!connected ? (
          <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50">
            <div className="p-4">
              <p className="text-sm text-yellow-800 flex items-center">
                <span className="animate-spin mr-2">🔄</span> Connecting to donation network...
              </p>
            </div>
          </div>
        ) : (
          <>
        

            <div className="space-y-4">
              <div className="grid w-full grid-cols-2 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center ${activeTab === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LogInIcon />
                  <span className="ml-2">Sign In</span>
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center ${activeTab === 'register' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <UserPlusIcon />
                  <span className="ml-2">Create Account</span>
                </button>
              </div>

              {activeTab === 'login' && (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-black">Sign In to Your Account</h3>
                    <p className="text-sm text-gray-600">Access your donation history and continue giving transparently</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="text-black block text-sm font-medium mb-1">Email Address</label>
                      <input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                      <p className="text-xs text-gray-600 mt-1">We will find your existing donor account</p>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 rounded-full py-3 px-4 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        disabled={loginLoading || !loginEmail.trim()}
                      >
                        <LogInIcon />
                        <span>{loginLoading ? 'Signing In...' : 'Sign In'}</span>
                      </button>
                    </div>
                  </form>
                  <div className="text-xs text-gray-500 space-y-1 bg-blue-50 p-3 rounded-xl">
                    <p className="font-medium text-blue-800">Returning Donor Benefits:</p>
                    <p>• Access your complete donation history</p>
                    <p>• View impact analytics and statistics</p>
                    <p>• Continue transparent giving journey</p>
                  </div>
                </div>
              )}

              {activeTab === 'register' && (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-black">Create Your Donor Account</h3>
                    <p className="text-sm text-gray-600">Join the transparent giving community</p>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="register-username" className="text-black block text-sm font-medium mb-1">Display Name</label>
                      <input
                        id="register-username"
                        type="text"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        placeholder="Enter your display name"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      />
                      <p className="text-xs text-gray-600 mt-1">This will be shown in your donation history (unless you donate anonymously)</p>
                    </div>
                    <div>
                      <label htmlFor="register-email" className="text-black block text-sm font-medium mb-1">Email Address</label>
                      <input
                        id="register-email"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      />
                      <p className="text-xs text-gray-600 mt-1">Used for account access and donation receipts</p>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2 rounded-full py-3 px-4 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        disabled={registerLoading || !registerUsername.trim() || !registerEmail.trim()}
                      >
                        <UserPlusIcon />
                        <span>{registerLoading ? 'Creating Account...' : 'Create Donor Account'}</span>
                      </button>
                    </div>
                  </form>
                  <div className="text-xs text-gray-500 space-y-1 bg-green-50 p-3 rounded-xl">
                    <p className="font-medium text-green-800">New Donor Features:</p>
                    <p>• Your donations are tracked transparently on the blockchain</p>
                    <p>• You can choose to donate anonymously for any donation</p>
                    <p>• All charity totals are publicly visible in real-time</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

// feature card props
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// feature card component
export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
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

// charity card props
interface CharityCardProps {
  name: string;
  description: string;
  received: number;
  organizations: string[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<Message>>; // Use the defined Message type
}

// charity card component
export const CharityCard: React.FC<CharityCardProps> = ({
  name,
  description,
  received,
  organizations,
  setIsModalOpen,
  setMainMessage,
}) => {
  const handleViewProfile = () => {
    setMainMessage({ type: 'info', text: `Viewing profile for ${name}` });
    setTimeout(() => setMainMessage(null), 3000);
  };

  const handleDonateNow = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Received</p>
          <p className="text-3xl font-bold text-green-600 mt-1">${received.toLocaleString()}</p>
        </div>
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Organizations</p>
          <ul className="mt-1 text-gray-700 space-y-1">
            {organizations.map((org, index) => (
              <li key={index} className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                {org}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex space-x-4 mt-auto">
        <button
          onClick={handleDonateNow}
          className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Donate Now
        </button>
        <button
          onClick={handleViewProfile}
          className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

// testimonial card props
interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  imageSrc: string;
}

// testimonial card component
export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title, imageSrc }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">

      <Image
        src={imageSrc}
        alt={`${author}'s profile`}
        width={96} 
        height={96} 
        className="rounded-full mb-4 object-cover border-4 border-white shadow-lg"
      />
      <p className="text-lg font-medium text-gray-800 mb-4 leading-relaxed italic">
        {`"${quote}"`}
      </p>
      <div className="text-sm font-semibold text-gray-900">{author}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
};

// main app component
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainMessage, setMainMessage] = useState<Message>(null);

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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-4 px-8 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-xl font-bold">DonateTransparently</span>
            <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 uppercase">Live Tracking</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Create Account
          </button>
        </div>
      </header>

      {/* main content */}
      <main className="container mx-auto pt-24 px-8">
        {mainMessage && (
          <div className={`my-4 py-3 px-6 rounded-full text-center font-medium ${mainMessage.type === 'info' ? 'bg-blue-100 text-blue-800' : ''}`}>
            {mainMessage.text}
          </div>
        )}
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
              className="bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Start Donating
            </button>
          </div>
        </section>

        {/* feature cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </section>

        {/* live stats */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Live Charity Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charities.map((charity, index) => (
              <CharityCard key={index} {...charity} setIsModalOpen={setIsModalOpen} setMainMessage={setMainMessage} />
            ))}
          </div>
        </section>

        {/* testimonials section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Donors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="py-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} DonateTransparently. All rights reserved.
      </footer>

      {/*  main modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Start Donating"
      >
        <DonationAuthContent onClose={() => setIsModalOpen(false)} onLoginSuccess={() => setMainMessage(null)} />
      </Modal>
    </div>
  );
}
