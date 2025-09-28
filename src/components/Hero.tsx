import { Search, MapPin, Home, DollarSign, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from "@/assets/hero-property.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury property showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="text-gradient block">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Discover premium properties and exceptional service with Amit Agarwal Real Estate. 
            Your journey to the perfect home starts here.
          </p>

          {/* Advanced Property Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="City, State, ZIP or Address"
                  className="pl-10 h-12 border-0 bg-muted focus:bg-white transition-all"
                />
              </div>
              
              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted focus:bg-white">
                  <Home className="h-5 w-5 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-family">Single Family Home</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="condo">Condominium</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land/Lot</SelectItem>
                  <SelectItem value="multi-family">Multi-Family</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted focus:bg-white">
                  <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-200k">$0 - $200k</SelectItem>
                  <SelectItem value="200k-400k">$200k - $400k</SelectItem>
                  <SelectItem value="400k-600k">$400k - $600k</SelectItem>
                  <SelectItem value="600k-800k">$600k - $800k</SelectItem>
                  <SelectItem value="800k-1m">$800k - $1M</SelectItem>
                  <SelectItem value="1m-1.5m">$1M - $1.5M</SelectItem>
                  <SelectItem value="1.5m-2m">$1.5M - $2M</SelectItem>
                  <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                  <SelectItem value="5m+">$5M+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted focus:bg-white">
                  <Bed className="h-5 w-5 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Beds</SelectItem>
                  <SelectItem value="1+">1+ Beds</SelectItem>
                  <SelectItem value="2+">2+ Beds</SelectItem>
                  <SelectItem value="3+">3+ Beds</SelectItem>
                  <SelectItem value="4+">4+ Beds</SelectItem>
                  <SelectItem value="5+">5+ Beds</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="hero" size="lg" className="h-12 lg:col-span-1">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-muted">
              <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary">
                Advanced Filters
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Save Search
                </Button>
                <Button variant="outline" size="sm">
                  Map View
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: "Properties Sold", value: "500+" },
              { label: "Happy Clients", value: "1200+" },
              { label: "Years Experience", value: "15+" },
              { label: "Awards Won", value: "25+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm md:text-base">
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