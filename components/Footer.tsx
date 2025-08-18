import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-gray-500">
      &copy; {new Date().getFullYear()} DonateTransparently. All rights reserved.
    </footer>
  );
};

export default Footer;