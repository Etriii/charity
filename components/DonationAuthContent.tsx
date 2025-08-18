import React, { useState, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, UserPlusIcon as HeroUserPlusIcon, CheckCircleIcon as HeroCheckCircleIcon, XCircleIcon as HeroXCircleIcon } from '@heroicons/react/24/solid';
import { FormEvent as ReactFormEvent } from 'react';
import { Message } from '@/types';

interface DonationAuthContentProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const DonationAuthContent: React.FC<DonationAuthContentProps> = ({ onClose, onLoginSuccess }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [identity, setIdentity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
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

  const handleRegister = (e: ReactFormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setMessage(null);

    setTimeout(() => {
      const mockRegisterSuccess = true;
      if (mockRegisterSuccess) {
        setConnected(true);
        setIdentity(`donor-registered-${Math.random().toString(36).substring(4)}`);
        setMessage({ type: 'success', text: 'Account created successfully! Please sign in.' });
        setTimeout(() => setActiveTab("login"), 1000);
      } else {
        setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
      }
      setRegisterLoading(false);
    }, 1500);
  };


  const LogInIcon = () => <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-700" />;
  const UserPlusIcon = () => <HeroUserPlusIcon className="w-5 h-5 text-blue-500" />;
  const CheckCircleIcon = () => <HeroCheckCircleIcon className="w-5 h-5 text-green-500" />;
  const XCircleIcon = () => <HeroXCircleIcon className="w-5 h-5 text-red-500" />;

  return (
    <>
      <div className="flex flex-col space-y-2 pb-4 text-center">
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

export default DonationAuthContent;