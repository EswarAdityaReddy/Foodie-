import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  
  return (
    <div className="flex items-center">
      <div className="bg-primary-600 text-white p-1.5 rounded-md mr-2">
        <UtensilsCrossed size={20} />
      </div>
      <span className={`text-xl font-semibold ${textColor}`}>
        Foodie
      </span>
    </div>
  );
};

export default Logo;