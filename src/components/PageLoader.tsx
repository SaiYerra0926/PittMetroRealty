import React from 'react';
import logoImage from '@/assets/pittmetrorealtylog.png';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      {/* Logo at Top */}
      <div className="absolute top-8 sm:top-12 md:top-16 left-1/2 -translate-x-1/2 bg-transparent">
        <img 
          src={logoImage} 
          alt="Pittmetro Realty Logo" 
          className="h-20 w-auto sm:h-24 sm:w-auto md:h-28 md:w-auto bg-transparent"
          style={{ background: 'transparent' }}
        />
      </div>
      
      {/* Main Loading Content - Centered */}
      <div className="flex flex-col items-center justify-center">
        {/* Large Logo with Animation */}
        <div className="mb-8 bg-transparent">
          <div className="relative bg-transparent">
            <img 
              src={logoImage} 
              alt="Pittmetro Realty Logo" 
              className="h-40 w-auto sm:h-48 sm:w-auto md:h-56 md:w-auto lg:h-64 lg:w-auto animate-pulse bg-transparent"
              style={{ background: 'transparent' }}
            />
            {/* Spinning Ring Around Logo */}
            <div className="absolute inset-0 flex items-center justify-center -m-4">
              <div className="w-full h-full border-4 border-primary/10 border-t-primary rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;

