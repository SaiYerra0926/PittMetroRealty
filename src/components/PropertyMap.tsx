import { useState } from "react";
import { MapPin, Navigation, Phone, Mail, Home, DollarSign, Bed, Bath } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PropertyMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(0);

  const properties = [
    {
      id: 1,
      name: "Robinson Luxury Home",
      address: "123 Robinson Plaza Drive, Robinson Township, PA",
      price: 485000,
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.5123, lng: -80.1312 },
      features: ["Modern Kitchen", "Hardwood Floors", "Garage", "Near Shopping"],
      status: "For Sale"
    },
    {
      id: 2,
      name: "Moon Township Executive Home",
      address: "456 Moon Park Drive, Moon Township, PA",
      price: 425000,
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      coordinates: { lat: 40.5089, lng: -80.2101 },
      features: ["Updated Bathrooms", "Fireplace", "Patio", "Near Airport"],
      status: "For Sale"
    },
    {
      id: 3,
      name: "Robinson Family Residence",
      address: "789 Settlers Ridge Way, Robinson Township, PA",
      price: 375000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.5156, lng: -80.1256 },
      features: ["Open Floor Plan", "Walk-in Closet", "Deck", "Near Schools"],
      status: "For Sale"
    },
    {
      id: 4,
      name: "Moon Township Investment Property",
      address: "321 Coraopolis Heights Road, Moon Township, PA",
      price: 325000,
      beds: 2,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.5023, lng: -80.1987 },
      features: ["Rental Income", "Updated Appliances", "Parking", "Near Downtown"],
      status: "Investment"
    },
    {
      id: 5,
      name: "Robinson Premium Home",
      address: "654 Thornburg Road, Robinson Township, PA",
      price: 525000,
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.5189, lng: -80.1189 },
      features: ["Master Suite", "Finished Basement", "Pool", "Near Robinson Mall"],
      status: "For Sale"
    }
  ];

  const getDirections = (property: typeof properties[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${property.coordinates.lat},${property.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Pittsburgh Area Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Explore our featured properties in Robinson Township and Moon Township, PA. Click on any property to get detailed information and directions.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">Robinson Township</Badge>
            <Badge variant="outline" className="px-4 py-2">Moon Township</Badge>
            <Badge variant="outline" className="px-4 py-2">Get Directions</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="shadow-luxury h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Property Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[500px] bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 opacity-60"></div>
                  
                  {/* Property Markers */}
                  {properties.map((property, index) => (
                    <div
                      key={property.id}
                      className={`absolute cursor-pointer transition-all duration-300 ${
                        selectedProperty === index ? 'scale-125 z-10' : 'hover:scale-110'
                      }`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`,
                      }}
                      onClick={() => setSelectedProperty(index)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        selectedProperty === index 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-primary border-2 border-primary'
                      }`}>
                        <Home className="h-4 w-4" />
                      </div>
                      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        selectedProperty === index 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-primary border border-primary'
                      }`}>
                        ${property.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h4 className="font-semibold text-sm mb-2">Legend</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>Selected Property</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white border border-primary rounded-full"></div>
                        <span>Available Properties</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {properties[selectedProperty] && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={properties[selectedProperty].image} 
                        alt={properties[selectedProperty].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {properties[selectedProperty].name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {properties[selectedProperty].address}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant={properties[selectedProperty].status === "For Sale" ? "default" : "secondary"}>
                          {properties[selectedProperty].status}
                        </Badge>
                      </div>
                      
                      <div className="text-2xl font-bold text-primary mb-4">
                        ${properties[selectedProperty].price.toLocaleString()}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <Bed className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <div className="text-sm font-semibold">{properties[selectedProperty].beds}</div>
                          <div className="text-xs text-muted-foreground">Beds</div>
                        </div>
                        <div className="text-center">
                          <Bath className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <div className="text-sm font-semibold">{properties[selectedProperty].baths}</div>
                          <div className="text-xs text-muted-foreground">Baths</div>
                        </div>
                        <div className="text-center">
                          <DollarSign className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <div className="text-sm font-semibold">{properties[selectedProperty].sqft.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Sq Ft</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-sm">Features:</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {properties[selectedProperty].features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          onClick={() => getDirections(properties[selectedProperty])}
                          className="w-full"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h4 className="font-semibold text-primary mb-4">Market Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Properties Listed</span>
                    <span className="text-sm font-semibold">{properties.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Price</span>
                    <span className="text-sm font-semibold">
                      ${Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price Range</span>
                    <span className="text-sm font-semibold">
                      ${Math.min(...properties.map(p => p.price)).toLocaleString()} - ${Math.max(...properties.map(p => p.price)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyMap;
