import React, { useState, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, UserPlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';


interface Message {
  type: 'success' | 'error' | 'info';
  text: string;
}

interface User {
  username: string;
  email: string;
  id: string;
  createdAt: string;
}

interface DonationAuthContentProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  onLogout?: () => void;
}

export const getUsersFromStorage = (): User[] => {
  if (typeof window !== 'undefined') {
    const usersJson = localStorage.getItem('donateTransparentlyUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  }
  return [];
};

export const setUsersInStorage = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('donateTransparentlyUsers', JSON.stringify(users));
  }
};

export const getCurrentSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('donateTransparentlyCurrentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
  return null;
};

export const setCurrentSession = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('donateTransparentlyCurrentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('donateTransparentlyCurrentUser');
    }
  }
};


const DonationAuthContent: React.FC<DonationAuthContentProps> = ({ onClose, onLoginSuccess, onLogout }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [identity, setIdentity] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [registerUsername, setRegisterUsername] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);

  // storage
  const storage = {
    getUsers: (): User[] => {
      return getUsersFromStorage();
    },
    saveUser: (user: User) => {
      const users = getUsersFromStorage();
      users.push(user);
      setUsersInStorage(users);
    },
    findUser: (email: string): User | undefined => {
      const users = getUsersFromStorage();
      return users.find((user: User) => user.email.toLowerCase() === email.toLowerCase());
    },
    clearAllUsers: () => {
      setUsersInStorage([]);
    },
    getCurrentUser: (): User | null => {
      return getCurrentSession();
    },
    setCurrentUser: (user: User | null) => {
      setCurrentSession(user);
      setCurrentUser(user);
    }
  };

  useEffect(() => {
    const existingUser = storage.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
      setConnected(true);
      setIdentity(`donor-session-${existingUser.id}`);
    } else {
      setTimeout(() => {
        setConnected(true);
        setIdentity('donor-guest');
      }, 1000);
    }
  }, []); 

const handleLogin = () => {
  setLoginLoading(true);
  setMessage(null);

  setTimeout(() => {
    const existingUser = storage.findUser(loginEmail);
    
    if (existingUser) {
      setConnected(true);
      setIdentity(`donor-logged-in-${existingUser.id}`);
      storage.setCurrentUser(existingUser);
      
      setMessage({ 
        type: 'success', 
        text: `Welcome back, ${existingUser.username}! You have successfully logged in.` 
      });

      setTimeout(() => setMessage(null), 3000);

      onLoginSuccess();
      setTimeout(() => onClose(), 2000);
    } else {
      setMessage({ 
        type: 'error', 
        text: 'No account found with this email. Please create an account first.' 
      });
    }
    setLoginLoading(false);
  }, 1500);
};

  const handleRegister = () => {
    setRegisterLoading(true);
    setMessage(null);

    setTimeout(() => {
      const existingUser = storage.findUser(registerEmail);
      
      if (existingUser) {
        setMessage({ 
          type: 'error', 
          text: 'An account with this email already exists. Please sign in instead.' 
        });
        setRegisterLoading(false);
        return;
      }

      const newUser: User = {
        username: registerUsername,
        email: registerEmail,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString()
      };

      storage.saveUser(newUser);
      
      setConnected(true);
      setIdentity(`donor-registered-${newUser.id}`);
      setMessage({ 
        type: 'success', 
        text: `Account created successfully for ${registerUsername}! Please sign in.` 
      });
      
      setRegisterUsername('');
      setRegisterEmail('');
      
      setTimeout(() => setActiveTab("login"), 1500);
      setRegisterLoading(false);
    }, 1500);
  };

  const handleResetAllData = () => {
    if (window.confirm('Are you sure you want to delete all user accounts? This cannot be undone.')) {
      storage.clearAllUsers();
      storage.setCurrentUser(null);
      setCurrentUser(null);
      setIdentity('donor-guest');
      setMessage({ type: 'info', text: 'All user data has been reset.' });
      if (onLogout) onLogout();
    }
  };

  const LogInIcon = () => <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-700" />;
  const UserPlusIconComponent = () => <UserPlusIcon className="w-5 h-5 text-blue-500" />;
  const CheckCircleIconComponent = () => <CheckCircleIcon className="w-5 h-5 text-green-500" />;
  const XCircleIconComponent = () => <XCircleIcon className="w-5 h-5 text-red-500" />;

  const allUsers = storage.getUsers();

  return (
    <div className="p-6 bg-white rounded-lg">
        <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold text-black">Sign In to Your Account</h3>
                      <p className="text-sm text-gray-600">Access your donation history and continue giving transparently</p>
                    </div>
                    
      <div className="space-y-4 mt-6">
        {message && (
          <div className={`rounded-xl border-2 ${message.type === 'success' ? 'border-green-400 bg-green-50' : message.type === 'error' ? 'border-red-400 bg-red-50' : 'border-blue-400 bg-blue-50'}`}>
            <div className="p-4 flex items-center space-x-2">
              {message.type === 'success' ? (
                <CheckCircleIconComponent />
              ) : message.type === 'error' ? (
                <XCircleIconComponent />
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
                  <UserPlusIconComponent />
                  <span className="ml-2">Create Account</span>
                </button>
              </div>

              {activeTab === 'login' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="text-black block text-sm font-medium mb-1">Email Address</label>
                      <input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                      <p className="text-xs text-gray-600 mt-1">We will find your existing donor account</p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 rounded-full py-3 px-4 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        disabled={loginLoading || !loginEmail.trim()}
                      >
                        <LogInIcon />
                        <span>{loginLoading ? 'Signing In...' : 'Sign In'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 bg-blue-50 p-3 rounded-xl">
                    <p className="font-medium text-blue-800">Returning Donor Benefits:</p>
                    <p>• Access your complete donation history</p>
                    <p>• View impact analytics and statistics</p>
                    <p>• Continue transparent giving journey</p>
                  </div>
                  {allUsers.length > 0 && (
                    <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded">
                      <p className="font-medium">Demo: Registered emails you can try:</p>
                      {allUsers.map(user => (
                        <p key={user.id}>• {user.email} ({user.username})</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'register' && (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-black">Create Your Donor Account</h3>
                    <p className="text-sm text-gray-600">Join the transparent giving community</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="register-username" className="text-black block text-sm font-medium mb-1">Display Name</label>
                      <input
                        id="register-username"
                        type="text"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        placeholder="Enter your display name"
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
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      />
                      <p className="text-xs text-gray-600 mt-1">Used for account access and donation receipts</p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleRegister}
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2 rounded-full py-3 px-4 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        disabled={registerLoading || !registerUsername.trim() || !registerEmail.trim()}
                      >
                        <UserPlusIconComponent />
                        <span>{registerLoading ? 'Creating Account...' : 'Create Donor Account'}</span>
                      </button>
                    </div>
                  </div>
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
        
      {/* debug */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <details className="group">
          <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
            Debug Info ({allUsers.length} users)
          </summary>
          <div className="mt-2 space-y-2">
            {allUsers.length > 0 && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <strong>Registered Users:</strong>
                {allUsers.map((user, idx) => (
                  <div key={idx} className="ml-2">
                    • {user.username} ({user.email})
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleResetAllData}
              className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </details>
      </div>
    </div>
      </div>
  );
};

export default DonationAuthContent;
