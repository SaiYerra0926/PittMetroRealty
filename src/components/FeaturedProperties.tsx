import { useState } from "react";
import { MapPin, Bed, Bath, Car, Square, Heart, Share2, Eye, Star, Calendar, Users, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const FeaturedProperties = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    <section id="properties" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-responsive-xl font-bold text-primary mb-6">
            Featured Properties
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Discover exceptional properties in Pittsburgh's most desirable neighborhoods. 
            Each home is carefully selected for its quality, location, and value.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3 text-gray-600 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Updated Daily</div>
                <div className="text-xs text-gray-500">Fresh listings</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Expert Agents</div>
                <div className="text-xs text-gray-500">Professional team</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-all duration-300">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Verified Listings</div>
                <div className="text-xs text-gray-500">Quality assured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <img
                  src={property.image}
                  alt={property.address}
                  className="property-image"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Status Badge */}
                <Badge className={`absolute top-4 left-4 ${getStatusColor(property.status)} border`}>
                  {property.status}
                </Badge>
                
                {/* Type Badge */}
                <Badge className={`absolute top-4 right-4 ${getTypeColor(property.type)}`}>
                  {property.type}
                </Badge>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Days on Market */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-xs font-medium text-gray-700">
                    {property.daysOnMarket} days on market
                  </span>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                {/* Price */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {property.price}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {property.address}
                  </p>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <Bed className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">{property.bedrooms}</span>
                    <p className="text-xs text-gray-500">Beds</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">{property.bathrooms}</span>
                    <p className="text-xs text-gray-500">Baths</p>
                  </div>
                  <div className="text-center">
                    <Square className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">{property.sqft}</span>
                    <p className="text-xs text-gray-500">Sq Ft</p>
                  </div>
                  <div className="text-center">
                    <Car className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">2</span>
                    <p className="text-xs text-gray-500">Garage</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Agent Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {property.agent.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{property.agent}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{property.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="btn-primary">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProperties;