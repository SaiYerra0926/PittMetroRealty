import { useState, useEffect } from "react";
import { TrendingUp, Building2, Users } from "lucide-react";
import { Home } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTabFromRoute = () => {
    const path = location.pathname;
    // Only set active tab if we're on a specific page, not on landing page
    if (path.includes('/sell')) return 'sell';
    if (path.includes('/buy')) return 'buy';
    if (path.includes('/rent')) return 'rent';
    if (path.includes('/manage')) return 'manage';
    return null; // No tab selected on landing page
  };

  const [activeTab, setActiveTab] = useState<string | null>(getActiveTabFromRoute());

  // Update active tab when route changes (only if on specific page, not landing)
  useEffect(() => {
    const routeTab = getActiveTabFromRoute();
    // Only update if we're on a specific page (not landing page)
    if (routeTab !== null) {
      setActiveTab(routeTab);
    } else {
      // On landing page, reset to no selection
      setActiveTab(null);
    }
  }, [location.pathname]);

  const tabs = [
    { id: "sell", label: "Sell", href: "/sell", icon: TrendingUp },
    { id: "buy", label: "Buy", href: "/buy", icon: Home },
    { id: "rent", label: "Rent", href: "/rent", icon: Building2 },
    { id: "manage", label: "Manage", href: "/manage", icon: Users },
  ];

  const handleTabClick = (tabId: string) => {
    // Update the active tab state when user clicks
    setActiveTab(tabId);
    
    // Navigate directly to the selected tab's page
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.href);
    }
  };


  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 sm:pt-20 md:pt-22 lg:pt-24 overflow-hidden bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 safe-top">
      {/* Background Image with Enhanced Animation */}
      <div className="absolute inset-0 z-0">
        <LazyLoadImage
          src={heroImage}
          alt="Luxury property showcase"
          effect="blur"
          width="100%"
          height="100%"
          placeholderSrc="/placeholder.svg"
          className="w-full h-full object-cover animate-gradient-shift"
        />
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/85 via-gray-900/75 to-slate-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/70 via-transparent to-transparent" />
        
        {/* Floating Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float-1"></div>
        <div className="hidden md:block absolute top-40 right-20 w-16 h-16 bg-primary/10 rounded-full animate-float-2"></div>
        <div className="hidden lg:block absolute bottom-40 left-20 w-24 h-24 bg-yellow-400/10 rounded-full animate-float-3"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float-4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline with Enhanced Animation */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
              <span className="block animate-slide-in-left">Discover</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 mt-2 animate-slide-in-right">
                Exceptional Properties
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/95 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto leading-relaxed animate-fade-in px-3 sm:px-4">
              Premium properties and exceptional service with Pitt Metro Realty. 
              Your trusted partner in real estate excellence.
            </p>
          </div>

          {/* Enhanced Category Selection Section - Professional UI/UX */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20 animate-scale-in mx-2 sm:mx-4">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 text-center font-semibold">
                  Select a category to search
                </p>
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-xl border border-white/20">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 sm:gap-3 touch-target min-h-[56px] sm:min-h-[60px] md:min-h-[64px] whitespace-nowrap relative group shadow-lg ${
                          isActive
                            ? "bg-white text-primary shadow-2xl scale-105 ring-4 ring-primary/30 transform"
                            : "bg-white text-gray-700 hover:text-primary hover:bg-white/90 hover:shadow-xl hover:scale-105"
                        }`}
                        aria-pressed={isActive}
                        title={`Click to explore ${tab.label.toLowerCase()} properties`}
                      >
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0 transition-transform duration-300 ${
                          isActive ? 'scale-110 text-primary' : 'text-gray-600 group-hover:scale-110 group-hover:text-primary'
                        }`} />
                        <span className={`text-xs sm:text-sm md:text-base font-bold transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-gray-700 group-hover:text-primary'
                        }`}>{tab.label}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-primary rounded-full animate-in fade-in duration-300 shadow-lg shadow-primary/50"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;