import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-gray-300 px-6 py-10 bg-gray-100">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left: Logo + tagline */}
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            CharityFlow
          </h2>
          <p className="text-sm text-gray-500">
            “Small acts, when multiplied by millions of people, can transform the world.”
          </p>
        </div>

        {/* Center: Newsletter */}
        <div className="text-center md:text-left">
          <p className="uppercase text-xs font-semibold text-gray-500 mb-3">
            Get Updates and Stories direct to your inbox
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 w-full rounded-l-md bg-gray-300 text-sm placeholder-gray-700 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-4 py-2 text-sm rounded-r-md font-semibold text-white">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right: Social + phone */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-pink-500">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500">
              <FaTwitter size={18} />
            </a>
          </div>
          <p className="text-sm text-gray-600">
            Call us: <span className="font-semibold">(02) 9062 3226</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar aligned with grid */}
      <div className="mt-8 border-t border-gray-300 pt-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs text-gray-500">
          {/* Left: Copyright */}
          <div>
            <p>&copy; {new Date().getFullYear()} CharityFlow. All Rights Reserved.</p>
          </div>

          {/* Center: Privacy / Terms */}
          <div className="flex justify-center space-x-4">
           
          </div>

          {/* Right: Contact (aligned with social+phone) */}
          <div className="flex justify-center md:justify-end">
            <p className="text-xs text-gray-600">
               <a href="#" className="hover:text-pink-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-pink-500">
              Terms & Conditions
            </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
