import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Luxury Downtown Apartment",
      location: "Manhattan, New York",
      price: "$2,850,000",
      image: property1,
      beds: 3,
      baths: 2,
      sqft: "2,400",
      type: "Apartment",
    },
    {
      id: 2,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$4,200,000",
      image: property2,
      beds: 5,
      baths: 4,
      sqft: "4,800",
      type: "Villa",
    },
    {
      id: 3,
      title: "Premium Office Space",
      location: "Financial District",
      price: "$1,650,000",
      image: property3,
      beds: 0,
      baths: 3,
      sqft: "3,200",
      type: "Commercial",
    },
  ];

  return (
    <section id="properties" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium properties, each offering exceptional 
            value and unmatched quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="group overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 transform hover:-translate-y-2 bg-gradient-card">
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-primary" />
                </button>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="text-2xl font-bold text-accent">
                    {property.price}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                  {property.beds > 0 && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.beds} Beds
                    </div>
                  )}
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.baths} Baths
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.sqft} sq ft
                  </div>
                </div>

                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="luxury" size="xl">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;