import { useState } from "react";
import { MapPin, Bed, Bath, Car, Square, Eye, Star, Calendar, Users, Clock, TrendingUp, Home, Key, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import PropertyDetailsModal from "@/components/PropertyDetailsModal";

const FeaturedProperties = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  const properties = [
    {
      id: 1,
      image: property1,
      price: "$850,000",
      address: "123 Oak Street, Shadyside, Pittsburgh",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,400",
      type: "Single Family",
      yearBuilt: 2018,
      features: ["Modern Kitchen", "Hardwood Floors", "Garage"],
      amenities: ["Pool", "Gym", "Parking"],
      status: "For Sale",
      listingType: "buy", // "buy", "rent", or "sell"
      daysOnMarket: 15,
      rating: 4.9,
      agent: "Sarah Johnson",
      description: "Stunning modern home with premium finishes and excellent location.",
      images: [property1, property2, property3]
    },
    {
      id: 2,
      image: property2,
      price: "$650,000",
      address: "456 Maple Avenue, Lawrenceville, Pittsburgh",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "1,800",
      type: "Townhouse",
      yearBuilt: 2020,
      features: ["Open Floor Plan", "Balcony", "Storage"],
      amenities: ["Rooftop", "Concierge", "Storage"],
      status: "For Sale",
      listingType: "buy",
      daysOnMarket: 8,
      rating: 4.8,
      agent: "Mike Chen",
      description: "Contemporary townhouse with urban lifestyle amenities.",
      images: [property2, property1, property3]
    },
    {
      id: 3,
      image: property3,
      price: "$1,200,000",
      address: "789 Pine Road, Squirrel Hill, Pittsburgh",
      bedrooms: 5,
      bathrooms: 4,
      sqft: "3,200",
      type: "Luxury Home",
      yearBuilt: 2015,
      features: ["Chef's Kitchen", "Wine Cellar", "Library"],
      amenities: ["Pool", "Tennis Court", "Garden"],
      status: "For Sale",
      listingType: "rent",
      daysOnMarket: 22,
      rating: 4.9,
      agent: "Emily Rodriguez",
      description: "Luxury estate with premium amenities and privacy.",
      images: [property3, property1, property2]
    },
    {
      id: 4,
      image: property1,
      price: "$450,000",
      address: "321 Elm Street, Downtown, Pittsburgh",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1,200",
      type: "Condominium",
      yearBuilt: 2019,
      features: ["City Views", "Modern Design", "Balcony"],
      amenities: ["Gym", "Concierge", "Rooftop"],
      status: "For Sale",
      listingType: "sell",
      daysOnMarket: 5,
      rating: 4.7,
      agent: "David Kim",
      description: "Modern downtown living with stunning city views.",
      images: [property1, property3, property2]
    },
    {
      id: 5,
      image: property2,
      price: "$750,000",
      address: "654 Cedar Lane, Mount Washington, Pittsburgh",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,100",
      type: "Single Family",
      yearBuilt: 2017,
      features: ["Mountain Views", "Deck", "Fireplace"],
      amenities: ["Parking", "Storage", "Garden"],
      status: "For Sale",
      listingType: "buy",
      daysOnMarket: 12,
      rating: 4.8,
      agent: "Lisa Thompson",
      description: "Charming home with breathtaking mountain and city views.",
      images: [property2, property1, property3]
    },
    {
      id: 6,
      image: property3,
      price: "$950,000",
      address: "987 Birch Boulevard, Fox Chapel, Pittsburgh",
      bedrooms: 5,
      bathrooms: 4,
      sqft: "2,800",
      type: "Estate",
      yearBuilt: 2016,
      features: ["Gourmet Kitchen", "Home Office", "Walk-in Closets"],
      amenities: ["Pool", "Tennis Court", "Guest House"],
      status: "For Sale",
      listingType: "rent",
      daysOnMarket: 18,
      rating: 4.9,
      agent: "Robert Wilson",
      description: "Elegant estate in prestigious neighborhood with luxury amenities.",
      images: [property3, property2, property1]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "For Sale":
        return "bg-green-100 text-green-800 border-green-200";
      case "Sold":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Luxury Home":
        return "bg-purple-100 text-purple-800";
      case "Single Family":
        return "bg-blue-100 text-blue-800";
      case "Townhouse":
        return "bg-green-100 text-green-800";
      case "Condominium":
        return "bg-orange-100 text-orange-800";
      case "Estate":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="properties" className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 sm:mb-3 md:mb-4 px-2">
            Featured Properties
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-5 px-3">
            Discover exceptional properties in Pittsburgh's most desirable neighborhoods. 
            Each home is carefully selected for its quality, location, and value.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6 px-2">
            <div className="flex items-center gap-2 sm:gap-2.5 text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group touch-target">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-gray-800">Updated Daily</div>
                <div className="text-[9px] sm:text-[10px] text-gray-500">Fresh listings</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group touch-target">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 flex-shrink-0">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-gray-800">Expert Agents</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Professional team</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group touch-target">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-all duration-300 flex-shrink-0">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-gray-800">Verified Listings</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Quality assured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {properties.map((property, index) => (
            <Card 
              key={property.id}
              className={`property-card group cursor-pointer animate-fade-in-up ${
                hoveredCard === property.id ? 'shadow-2xl' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(property.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <LazyLoadImage
                  src={property.image}
                  alt={property.address}
                  effect="blur"
                  width="100%"
                  height="auto"
                  placeholderSrc="/placeholder.svg"
                  className="property-image"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Listing Type Icon Badge - Top Left */}
                <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300 ${
                  property.listingType === 'buy' ? 'bg-blue-500/95 text-white hover:bg-blue-600/95' :
                  property.listingType === 'rent' ? 'bg-green-500/95 text-white hover:bg-green-600/95' :
                  'bg-primary/95 text-white hover:bg-primary'
                }`}>
                  {property.listingType === 'buy' ? (
                    <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  ) : property.listingType === 'rent' ? (
                    <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  ) : (
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  )}
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide">
                    {property.listingType === 'buy' ? 'Buy' : property.listingType === 'rent' ? 'Rent' : 'Sell'}
                  </span>
                </div>
                {/* Days on Market */}
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1">
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                    {property.daysOnMarket} days on market
                  </span>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 sm:p-5 md:p-6">
                {/* Price */}
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-1.5">
                    {property.price}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 flex items-start sm:items-center gap-1 leading-tight sm:leading-normal">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="break-words">{property.address}</span>
                  </p>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                  <div className="text-center">
                    <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block">{property.bedrooms}</span>
                    <p className="text-[10px] sm:text-xs text-gray-500">Beds</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block">{property.bathrooms}</span>
                    <p className="text-[10px] sm:text-xs text-gray-500">Baths</p>
                  </div>
                  <div className="text-center">
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block">{property.sqft}</span>
                    <p className="text-[10px] sm:text-xs text-gray-500">Sq Ft</p>
                  </div>
                  <div className="text-center">
                    <Car className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block">2</span>
                    <p className="text-[10px] sm:text-xs text-gray-500">Garage</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                  {property.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {property.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Agent Info */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] sm:text-xs font-semibold">
                        {property.agent.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{property.agent}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current flex-shrink-0" />
                        <span className="text-[10px] sm:text-xs text-gray-600">{property.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedProperty(property)}
                    className="bg-primary text-white hover:bg-primary/90 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 touch-target min-h-[44px] flex-shrink-0 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="hidden sm:inline">View</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>

      </div>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  );
};

export default FeaturedProperties;