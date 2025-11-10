import React from 'react';
import { Link } from 'react-router-dom';
import logoNoBgImg from '@/assets/pittmetrorealtylog_no_bg.png';
import logoImage from '@/assets/pittmetrorealtylog.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  theme?: 'light' | 'dark';
  logoNoBg?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full',
  theme = 'light',
  logoNoBg = false
}) => {
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-16', 
    lg: 'h-24',
    xl: 'h-32'
  };

  const imageSizes = {
    sm: 'h-12 w-auto',
    md: 'h-16 w-auto', 
    lg: 'h-24 w-auto',
    xl: 'h-32 w-auto'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl'
  };

  const LogoIcon = () => (
    <div className={`${imageSizes[size]} ${className} flex items-center justify-center bg-transparent`}>
      <img 
        src={logoNoBg ? logoNoBgImg : logoImage} 
        alt="Pittmetro Realty Logo" 
        className={`${imageSizes[size]} object-contain bg-transparent`}
        style={{ maxWidth: 'none', background: 'transparent' }}
      />
    </div>
  );

  const LogoText = () => (
    <Link to="/" className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <LogoIcon />
    </Link>
  );

  const TextOnly = () => (
    <Link to="/" className={`flex items-center ${className}`}>
      <LogoIcon />
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