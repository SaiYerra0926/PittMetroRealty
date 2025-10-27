import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  theme?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full',
  theme = 'light'
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12', 
    lg: 'h-16',
    xl: 'h-20'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl'
  };

  // Theme-based colors
  const colors = {
    light: {
      primary: '#1a5d1a',
      text: 'text-gray-800',
      fill: 'fill-gray-800'
    },
    dark: {
      primary: '#22c55e', // Bright green for dark backgrounds
      text: 'text-white',
      fill: 'fill-white'
    }
  };

  const currentColors = colors[theme];

  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 120 80"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central Compass-like Emblem */}
        <g transform="translate(60, 30)">
          {/* Outer Circle */}
          <circle cx="0" cy="0" r="18" stroke={currentColors.primary} strokeWidth="2" fill="none"/>
          {/* Inner Circle */}
          <circle cx="0" cy="0" r="15" stroke={currentColors.primary} strokeWidth="1.5" fill="none"/>
          
          {/* Compass Rose Lines */}
          {/* Cardinal Directions */}
          <line x1="0" y1="-15" x2="0" y2="15" stroke={currentColors.primary} strokeWidth="1.5"/>
          <line x1="-15" y1="0" x2="15" y2="0" stroke={currentColors.primary} strokeWidth="1.5"/>
          {/* Intercardinal Directions */}
          <line x1="-10.6" y1="-10.6" x2="10.6" y2="10.6" stroke={currentColors.primary} strokeWidth="1"/>
          <line x1="10.6" y1="-10.6" x2="-10.6" y2="10.6" stroke={currentColors.primary} strokeWidth="1"/>
          
          {/* Central House Icon */}
          <g transform="translate(-3, -3)">
            {/* House Body */}
            <rect x="0" y="3" width="6" height="4" fill={currentColors.primary} stroke={currentColors.primary} strokeWidth="0.5"/>
            {/* House Roof */}
            <polygon points="3,0 0,3 6,3" fill={currentColors.primary} stroke={currentColors.primary} strokeWidth="0.5"/>
            {/* Windows */}
            <rect x="1" y="4" width="1" height="1" fill={theme === 'dark' ? '#1a5d1a' : '#ffffff'}/>
            <rect x="4" y="4" width="1" height="1" fill={theme === 'dark' ? '#1a5d1a' : '#ffffff'}/>
          </g>
        </g>
        
        {/* Abstract Shapes - Left Side */}
        <g transform="translate(25, 25)">
          <ellipse cx="0" cy="0" rx="3" ry="2" fill={currentColors.primary} opacity="0.9"/>
          <ellipse cx="2" cy="2" rx="2" ry="1.5" fill={currentColors.primary} opacity="0.7"/>
        </g>
        
        {/* Abstract Shapes - Right Side */}
        <g transform="translate(85, 20)">
          <ellipse cx="0" cy="0" rx="4" ry="2.5" fill={currentColors.primary} opacity="0.9"/>
          <ellipse cx="3" cy="2" rx="2.5" ry="1.8" fill={currentColors.primary} opacity="0.7"/>
          <ellipse cx="1" cy="4" rx="2" ry="1.2" fill={currentColors.primary} opacity="0.8"/>
        </g>
        
        {/* Small Dots - Top */}
        <circle cx="45" cy="15" r="1" fill={currentColors.primary}/>
        <circle cx="75" cy="15" r="1" fill={currentColors.primary}/>
        
        {/* Company Text */}
        <text x="60" y="65" textAnchor="middle" className={`font-bold ${currentColors.text} text-sm ${currentColors.fill}`}>
          PITT METRO
        </text>
        <text x="60" y="75" textAnchor="middle" className={`font-semibold ${currentColors.text} text-xs ${currentColors.fill}`}>
          REALTY
        </text>
        <text x="60" y="85" textAnchor="middle" className={`font-normal ${currentColors.text} text-xs ${currentColors.fill}`}>
          — 2025 —
        </text>
      </svg>
    </div>
  );

  const LogoText = () => (
    <Link to="/" className={`flex items-center gap-4 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <span className={`font-bold ${currentColors.text} ${textSizes[size]} leading-tight`}>
          PITT METRO
        </span>
        <span className={`font-semibold ${currentColors.text} ${size === 'sm' ? 'text-xs' : 'text-sm'} leading-tight`}>
          REALTY
        </span>
        <span className={`font-normal ${currentColors.text} ${size === 'sm' ? 'text-xs' : 'text-sm'} leading-tight`}>
          — 2025 —
        </span>
      </div>
    </Link>
  );

  const TextOnly = () => (
    <Link to="/" className={`flex flex-col ${className}`}>
      <span className={`font-bold ${currentColors.text} ${textSizes[size]} leading-tight`}>
        PITT METRO
      </span>
      <span className={`font-semibold ${currentColors.text} ${size === 'sm' ? 'text-xs' : 'text-sm'} leading-tight`}>
        REALTY
      </span>
      <span className={`font-normal ${currentColors.text} ${size === 'sm' ? 'text-xs' : 'text-sm'} leading-tight`}>
        — 2025 —
      </span>
    </Link>
  );

  switch (variant) {
    case 'icon':
      return <Link to="/"><LogoIcon /></Link>;
    case 'text':
      return <TextOnly />;
    case 'full':
    default:
      return <LogoText />;
  }
};

export default Logo;