import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Bed, Bath, Calendar, Star, Heart, Share2, Phone, Mail, Filter, Clock, Users, Shield, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Rent = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    leaseLength: ""
  });

  const rentalProperties = [
    {
      id: 1,
      image: "/api/placeholder/400/300",
      price: "$2,500",
      period: "/month",
      address: "123 Oak Street, Shadyside, Pittsburgh",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1,200",
      type: "Apartment",
      yearBuilt: 2020,
      features: ["Pet Friendly", "Parking", "Gym"],
      amenities: ["Pool", "Laundry", "Balcony"],
      status: "Available",
      availableDate: "2024-02-01",
      leaseLength: "12 months",
      rating: 4.8,
      agent: "Pitt Metro Realty",
      deposit: "$2,500"
    },
    {
      id: 2,
      image: "/api/placeholder/400/300",
      price: "$1,800",
      period: "/month",
      address: "456 Maple Avenue, Lawrenceville, Pittsburgh",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "800",
      type: "Studio",
      yearBuilt: 2019,
      features: ["Furnished", "Utilities Included", "Parking"],
      amenities: ["Rooftop", "Concierge", "Storage"],
      status: "Available",
      availableDate: "2024-01-15",
      leaseLength: "6-12 months",
      rating: 4.6,
      agent: "Pitt Metro Realty",
      deposit: "$1,800"
    },
    {
      id: 3,
      image: "/api/placeholder/400/300",
      price: "$3,200",
      period: "/month",
      address: "789 Pine Road, Mount Lebanon, Pittsburgh",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "1,800",
      type: "Townhouse",
      yearBuilt: 2018,
      features: ["Garage", "Garden", "Updated Kitchen"],
      amenities: ["Patio", "Fireplace", "Hardwood Floors"],
      status: "Available",
      availableDate: "2024-02-15",
      leaseLength: "12 months",
      rating: 4.9,
      agent: "Pitt Metro Realty",
      deposit: "$3,200"
    },
    {
      id: 4,
      image: "/api/placeholder/400/300",
      price: "$4,500",
      period: "/month",
      address: "321 Elm Street, Fox Chapel, Pittsburgh",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,500",
      type: "Single Family",
      yearBuilt: 2017,
      features: ["Pool", "Fireplace", "Walk-in Closet"],
      amenities: ["Deck", "Finished Basement", "Two-Car Garage"],
      status: "Available",
      availableDate: "2024-03-01",
      leaseLength: "12-24 months",
      rating: 4.7,
      agent: "Pitt Metro Realty",
      deposit: "$4,500"
    },
    {
      id: 5,
      image: "/api/placeholder/400/300",
      price: "$2,200",
      period: "/month",
      address: "654 Cedar Lane, Squirrel Hill, Pittsburgh",
      bedrooms: 2,
      bathrooms: 1,
      sqft: "1,000",
      type: "Apartment",
      yearBuilt: 2021,
      features: ["Pet Friendly", "Parking", "Balcony"],
      amenities: ["Gym", "Laundry", "Storage"],
      status: "Available",
      availableDate: "2024-01-20",
      leaseLength: "12 months",
      rating: 4.8,
      agent: "Pitt Metro Realty",
      deposit: "$2,200"
    },
    {
      id: 6,
      image: "/api/placeholder/400/300",
      price: "$1,500",
      period: "/month",
      address: "987 Birch Boulevard, Regent Square, Pittsburgh",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "700",
      type: "Apartment",
      yearBuilt: 2016,
      features: ["Utilities Included", "Parking", "Pet Friendly"],
      amenities: ["Laundry", "Storage", "Balcony"],
      status: "Available",
      availableDate: "2024-02-10",
      leaseLength: "6-12 months",
      rating: 4.5,
      agent: "Pitt Metro Realty",
      deposit: "$1,500"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary via-primary-light to-primary text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Trusted by 10,000+ Pittsburgh Renters
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Rental Home
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover premium rental properties in Pittsburgh with flexible lease terms, 
              exceptional amenities, and transparent pricing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Clock className="h-4 w-4 text-yellow-300" />
                <span className="font-medium text-sm">Flexible Leases</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Shield className="h-4 w-4 text-green-300" />
                <span className="font-medium text-sm">Pet Friendly</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Wifi className="h-4 w-4 text-blue-300" />
                <span className="font-medium text-sm">Modern Amenities</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Users className="h-4 w-4 text-purple-300" />
                <span className="font-medium text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-16 left-8 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-8 w-24 h-24 bg-yellow-300/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-300/10 rounded-full blur-xl"></div>
      </section>

      {/* Search Section */}
      <section className="py-16 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
                  <Search className="h-4 w-4" />
                  Advanced Search
                </div>
                <h2 className="text-4xl font-bold text-slate-800 mb-4">
                  Find Your Dream Rental
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Use our comprehensive search tools to find the perfect rental property that matches your lifestyle and budget
                </p>
              </div>

              <div className="space-y-8">
                {/* Main Search */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <Input
                    placeholder="Enter city, neighborhood, or ZIP code"
                    className="pl-14 h-16 text-lg border-2 border-gray-200 focus:border-primary rounded-2xl shadow-sm"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  />
                  <Button 
                    size="lg" 
                    className="absolute right-3 top-3 h-10 px-8 bg-primary hover:bg-primary/90 rounded-xl"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                  <Select value={searchFilters.priceMin} onValueChange={(value) => setSearchFilters({...searchFilters, priceMin: value})}>
                    <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-primary rounded-xl">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Min Rent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="1000">$1,000</SelectItem>
                      <SelectItem value="1500">$1,500</SelectItem>
                      <SelectItem value="2000">$2,000</SelectItem>
                      <SelectItem value="2500">$2,500</SelectItem>
                      <SelectItem value="3000">$3,000</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={searchFilters.priceMax} onValueChange={(value) => setSearchFilters({...searchFilters, priceMax: value})}>
                    <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-primary rounded-xl">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Max Rent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1500">$1,500</SelectItem>
                      <SelectItem value="2000">$2,000</SelectItem>
                      <SelectItem value="2500">$2,500</SelectItem>
                      <SelectItem value="3000">$3,000</SelectItem>
                      <SelectItem value="4000">$4,000</SelectItem>
                      <SelectItem value="5000">$5,000+</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={searchFilters.bedrooms} onValueChange={(value) => setSearchFilters({...searchFilters, bedrooms: value})}>
                    <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-primary rounded-xl">
                      <Bed className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={searchFilters.bathrooms} onValueChange={(value) => setSearchFilters({...searchFilters, bathrooms: value})}>
                    <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-primary rounded-xl">
                      <Bath className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={searchFilters.propertyType} onValueChange={(value) => setSearchFilters({...searchFilters, propertyType: value})}>
                    <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-primary rounded-xl">
                      <Home className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="house">Single Family</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={searchFilters.leaseLength} onValueChange={(value) => setSearchFilters({...searchFilters, leaseLength: value})}>
                    <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-primary rounded-xl">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Lease Length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">12 Months</SelectItem>
                      <SelectItem value="24">24 Months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="h-14 border-2 border-gray-200 hover:border-primary rounded-xl">
                    <Filter className="h-5 w-5 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Results */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="text-slate-600 font-medium">
                    Showing {rentalProperties.length} rental properties
                  </div>
                  <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Updated daily with new listings
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rental Properties Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              <Home className="h-4 w-4" />
              Featured Rentals
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Available Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium rental properties across Pittsburgh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProperties.map((property) => (
              <Card key={property.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <div className="w-full h-72 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center">
                    <Home className="h-20 w-20 text-slate-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 font-medium">
                    {property.status}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-3xl font-bold text-white drop-shadow-lg">
                      {property.price}
                      <span className="text-lg font-normal text-white/80">{property.period}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-slate-600">{property.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {property.address}
                  </h3>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      <span className="font-medium">{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4" />
                      <span className="font-medium">{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span className="font-medium">{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        +{property.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Available:</span>
                      <span className="font-semibold text-slate-800">{property.availableDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Lease:</span>
                      <span className="font-semibold text-slate-800">{property.leaseLength}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Deposit:</span>
                      <span className="font-semibold text-slate-800">{property.deposit}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Tour
                    </Button>
                    <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                  
                  <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-gray-100">
                    Listed by {property.agent}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white">
              Load More Rentals
            </Button>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary via-primary-light to-primary text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium mb-4">
            <Phone className="h-3 w-3" />
            Ready to Get Started?
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
            Ready to Find Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Next Home?
            </span>
          </h2>
          
          <p className="text-base text-white/90 mb-6 leading-relaxed max-w-xl mx-auto">
            Our experienced team is here to help you find the perfect rental property 
            that fits your lifestyle and budget.
          </p>
          
          <div className="mb-8">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-6 py-3 text-base font-semibold shadow-xl">
              <Phone className="h-4 w-4 mr-2" />
              Call +1-412-977-7090
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-300" />
              </div>
              <h3 className="text-sm font-semibold mb-1">24/7 Support</h3>
              <p className="text-white/80 text-xs">Round-the-clock assistance for all your rental needs</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-300" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Verified Properties</h3>
              <p className="text-white/80 text-xs">All listings are verified and meet our quality standards</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-300" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Expert Guidance</h3>
              <p className="text-white/80 text-xs">Professional agents to guide you through the process</p>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-6 left-6 w-12 h-12 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 right-6 w-16 h-16 bg-yellow-300/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-blue-300/10 rounded-full blur-xl"></div>
      </section>
    </div>
  );
};

export default Rent;
