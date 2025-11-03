import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Bed, Bath, Car, ArrowRight, Clock, TrendingUp, Filter, Map, Bookmark, Building2, Key, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-property.jpg";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Hero = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const navigate = useNavigate();

  const tabs = [
    { id: "sell", label: "Sell", href: "/sell", icon: TrendingUp },
    { id: "buy", label: "Buy", href: "/buy", icon: Home },
    { id: "rent", label: "Rent", href: "/rent", icon: Building2 },
    { id: "manage", label: "Manage", href: "/manage", icon: Users },
  ];

  const handleTabClick = (tabId: string, href: string) => {
    setActiveTab(tabId);
    navigate(href);
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
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float-1"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary/10 rounded-full animate-float-2"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-yellow-400/10 rounded-full animate-float-3"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float-4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline with Enhanced Animation */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
              <span className="block animate-slide-in-left">Discover</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 mt-2 animate-slide-in-right">
                Exceptional Properties
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in px-3 sm:px-4">
              Premium properties and exceptional service with Pitt Metro Realty. 
              Your trusted partner in real estate excellence.
            </p>
          </div>

          {/* Enhanced Property Search Section */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl border border-white/20 animate-scale-in mx-2 sm:mx-4">
            {/* Search Tabs */}
            <div className="flex justify-center mb-6 sm:mb-7 md:mb-8">
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 bg-gray-100 rounded-lg p-1 sm:p-1.5 md:p-2 w-full max-w-full overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id, tab.href)}
                      className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-md font-medium transition-all text-xs sm:text-sm md:text-base flex items-center gap-1.5 sm:gap-2 touch-target min-h-[44px] whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Form */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Main Search Input */}
              <div className="relative">
                <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10" />
                <Input
                  placeholder="Enter property address, suburb, or postcode"
                  className="pl-10 sm:pl-12 pr-24 sm:pr-28 md:pr-32 h-11 sm:h-12 md:h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-primary rounded-lg sm:rounded-xl transition-all duration-300 hover:border-gray-300"
                />
                <Button 
                  size="lg" 
                  className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 h-8 sm:h-9 md:h-10 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 touch-target whitespace-nowrap"
                >
                  <Search className="h-3 w-3 sm:h-4 sm:w-4 md:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Select>
                  <SelectTrigger className="h-11 sm:h-12 md:h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-primary rounded-lg sm:rounded-xl transition-all duration-300 hover:border-gray-300 touch-target">
                    <Home className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-11 sm:h-12 md:h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-primary rounded-lg sm:rounded-xl transition-all duration-300 hover:border-gray-300 touch-target">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-500k">$0 - $500k</SelectItem>
                    <SelectItem value="500k-750k">$500k - $750k</SelectItem>
                    <SelectItem value="750k-1m">$750k - $1M</SelectItem>
                    <SelectItem value="1m-1.5m">$1M - $1.5M</SelectItem>
                    <SelectItem value="1.5m-2m">$1.5M - $2M</SelectItem>
                    <SelectItem value="2m+">$2M+</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-11 sm:h-12 md:h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-primary rounded-lg sm:rounded-xl transition-all duration-300 hover:border-gray-300 touch-target">
                    <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-11 sm:h-12 md:h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-primary rounded-lg sm:rounded-xl transition-all duration-300 hover:border-gray-300 touch-target">
                    <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Options */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t border-gray-200">
                <Button variant="ghost" className="text-primary hover:text-primary/80 text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2 touch-target min-h-[44px] px-3 sm:px-4">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Advanced Filters</span>
                  <span className="sm:hidden">Filters</span>
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2 touch-target min-h-[44px] px-3 sm:px-4">
                  <Map className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Map View</span>
                  <span className="sm:hidden">Map</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2 touch-target min-h-[44px] px-3 sm:px-4">
                  <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Save Search</span>
                  <span className="sm:hidden">Save</span>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;