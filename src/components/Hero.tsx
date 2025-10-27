import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Bed, Bath, Car, ArrowRight, Star, Users, Award, Clock, TrendingUp, Filter, Map, Bookmark, Building2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-property.jpg";
import { useNavigate } from "react-router-dom";

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

  const quickStats = [
    { icon: Star, label: "Client Rating", value: "4.9/5" },
    { icon: Users, label: "Happy Clients", value: "1,200+" },
    { icon: Award, label: "Awards Won", value: "25+" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900">
      {/* Background Image with Enhanced Animation */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury property showcase"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline with Enhanced Animation */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block animate-slide-in-left">Discover</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 mt-2 animate-slide-in-right">
                Exceptional Properties
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Premium properties and exceptional service with Pitt Metro Realty. 
              Your trusted partner in real estate excellence.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in-up">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2 text-white/90" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Icon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{stat.value}</span>
                    <span className="text-xs text-white/70">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Property Search Section */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20 animate-scale-in">
            {/* Search Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id, tab.href)}
                      className={`px-6 py-3 rounded-md font-medium transition-all text-sm flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Form */}
            <div className="space-y-6">
              {/* Main Search Input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter property address, suburb, or postcode"
                  className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-300 hover:border-gray-300"
                />
                <Button 
                  size="lg" 
                  className="absolute right-2 top-2 h-8 px-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 hover:border-gray-300">
                    <Home className="h-4 w-4 text-gray-400 mr-2" />
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
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 hover:border-gray-300">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
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
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 hover:border-gray-300">
                    <Bed className="h-4 w-4 text-gray-400 mr-2" />
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
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 hover:border-gray-300">
                    <Bath className="h-4 w-4 text-gray-400 mr-2" />
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
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-200">
                <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Map View
                </Button>
                <Button variant="outline" size="sm" className="text-sm font-medium flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save Search
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