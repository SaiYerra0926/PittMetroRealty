import { useState } from "react";
import { Plus, X, MapPin, Bed, Bath, Square, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PropertyComparison = () => {
  const [selectedProperties, setSelectedProperties] = useState([
    {
      id: 1,
      address: "123 Luxury Lane",
      price: 875000,
      beds: 4,
      baths: 3,
      sqft: 2800,
      yearBuilt: 2018,
      pricePerSqft: 312,
      lotSize: "0.25 acres",
      propertyType: "Single Family",
      daysOnMarket: 12,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["Modern Kitchen", "Hardwood Floors", "Walk-in Closet", "Fireplace"]
    },
    {
      id: 2,
      address: "456 Executive Drive",
      price: 1200000,
      beds: 5,
      baths: 4,
      sqft: 3600,
      yearBuilt: 2020,
      pricePerSqft: 333,
      lotSize: "0.4 acres",
      propertyType: "Single Family",
      daysOnMarket: 8,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      features: ["Gourmet Kitchen", "Marble Countertops", "Master Suite", "Pool"]
    }
  ]);

  const addProperty = () => {
    const newProperty = {
      id: selectedProperties.length + 1,
      address: "789 Premium Plaza",
      price: 950000,
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      yearBuilt: 2019,
      pricePerSqft: 396,
      lotSize: "0.3 acres",
      propertyType: "Townhouse",
      daysOnMarket: 15,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["Open Floor Plan", "Granite Countertops", "Balcony", "Garage"]
    };
    setSelectedProperties([...selectedProperties, newProperty]);
  };

  const removeProperty = (id: number) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== id));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Property Comparison Tool
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Compare properties side by side to make informed decisions. Analyze key metrics, features, and value propositions.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">Real Photos</Badge>
            <Badge variant="outline" className="px-4 py-2">Detailed Analysis</Badge>
            <Badge variant="outline" className="px-4 py-2">Value Scoring</Badge>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {selectedProperties.map((property, index) => (
              <Card key={property.id} className="shadow-luxury relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 z-10"
                  onClick={() => removeProperty(property.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <img 
                      src={property.image} 
                      alt={property.address}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                    {property.address}
                  </CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Built {property.yearBuilt}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price per sqft</span>
                      <span className="text-sm font-semibold">${property.pricePerSqft}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Lot Size</span>
                      <span className="text-sm font-semibold">{property.lotSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Property Type</span>
                      <span className="text-sm font-semibold">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Days on Market</span>
                      <Badge variant={property.daysOnMarket < 10 ? "destructive" : "secondary"}>
                        {property.daysOnMarket} days
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-xs text-muted-foreground mb-2">Value Score</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full" 
                          style={{ width: `${Math.min((400 - property.pricePerSqft) / 2, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold">
                        {Math.round(Math.min((400 - property.pricePerSqft) / 2, 100))}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {selectedProperties.length < 3 && (
              <Card 
                className="shadow-card border-dashed border-2 cursor-pointer hover:border-primary transition-colors"
                onClick={addProperty}
              >
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Add Property</h3>
                  <p className="text-muted-foreground text-sm">
                    Click to add another property for comparison
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {selectedProperties.length > 1 && (
            <div className="mt-12">
              <Card className="shadow-luxury">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Comparison Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Best Value</h4>
                      <p className="text-lg font-bold">{selectedProperties.reduce((best, current) => 
                        current.pricePerSqft < best.pricePerSqft ? current : best
                      ).address}</p>
                      <p className="text-sm text-green-600">
                        ${selectedProperties.reduce((best, current) => 
                          current.pricePerSqft < best.pricePerSqft ? current : best
                        ).pricePerSqft}/sqft
                      </p>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Largest Space</h4>
                      <p className="text-lg font-bold">{selectedProperties.reduce((largest, current) => 
                        current.sqft > largest.sqft ? current : largest
                      ).address}</p>
                      <p className="text-sm text-blue-600">
                        {selectedProperties.reduce((largest, current) => 
                          current.sqft > largest.sqft ? current : largest
                        ).sqft.toLocaleString()} sqft
                      </p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Newest Build</h4>
                      <p className="text-lg font-bold">{selectedProperties.reduce((newest, current) => 
                        current.yearBuilt > newest.yearBuilt ? current : newest
                      ).address}</p>
                      <p className="text-sm text-purple-600">
                        Built in {selectedProperties.reduce((newest, current) => 
                          current.yearBuilt > newest.yearBuilt ? current : newest
                        ).yearBuilt}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyComparison;