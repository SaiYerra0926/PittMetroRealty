import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Bed, Bath, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConsultationDialog from "@/components/ConsultationDialog";
import heroImage from "@/assets/hero-property.jpg";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const tabs = [
    { id: "sell", label: "Sell" },
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "manage", label: "Manage" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-36 lg:pt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury property showcase"
          className="w-full h-full object-cover"
        />
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-slate-800/60 to-indigo-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
              <span className="block animate-slide-in-left">Find Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 animate-slide-in-right mt-2">
                Dream Home
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
              Discover premium properties and exceptional service with Amit Agarwal Real Estate. 
              Your journey to the perfect home starts here.
            </p>
          </div>

          {/* Property Search Section */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/20">
            {/* Search Tabs */}
            <div className="flex justify-center mb-10">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-3 rounded-md font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Form */}
            <div className="space-y-8">
              {/* Main Search Input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter property address, suburb, or postcode"
                  className="pl-12 h-16 text-lg border-2 border-gray-200 focus:border-primary rounded-xl"
                />
                <Button 
                  size="lg" 
                  className="absolute right-3 top-3 h-10 px-8 bg-primary hover:bg-primary/90"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Select>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl">
                    <Home className="h-5 w-5 text-gray-400 mr-2" />
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
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
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
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl">
                    <Bed className="h-5 w-5 text-gray-400 mr-2" />
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
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl">
                    <Bath className="h-5 w-5 text-gray-400 mr-2" />
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
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" className="text-primary hover:text-primary/80">
                    Advanced Filters
                  </Button>
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                    Map View
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Save Search
                  </Button>
                  <Button variant="outline" size="sm">
                    Get Property Report
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { label: "Properties Sold", value: "500+" },
              { label: "Happy Clients", value: "1200+" },
              { label: "Years Experience", value: "15+" },
              { label: "Awards Won", value: "25+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-white/90 text-base md:text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;