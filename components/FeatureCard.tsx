import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;