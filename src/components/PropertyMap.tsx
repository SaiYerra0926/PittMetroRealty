import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Phone, Mail, Home, DollarSign, Bed, Bath } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const properties = [
    {
      id: 1,
      name: "Chatham Park Residence",
      address: "1000 Chatham Park Dr, Pittsburgh, PA 15216",
      price: 340000,
      beds: 3,
      baths: 2.5,
      sqft: 1850,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.3995, lng: -79.9667 },
      features: ["Garage", "Updated Kitchen", "Hardwood Floors", "Central AC"],
      status: "For Rent"
    },
    {
      id: 2,
      name: "Canterbury Dr Home",
      address: "2600 Canterbury Dr, Imperial, PA 15126",
      price: 288000,
      beds: 4,
      baths: 3,
      sqft: 2200,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      coordinates: { lat: 40.4376, lng: -80.2667 },
      features: ["Large Yard", "Updated Bathrooms", "Attached Garage", "Deck"],
      status: "For Rent"
    },
    {
      id: 3,
      name: "Overlook Court Townhouse",
      address: "246 Overlook Ct, Coraopolis, PA 15108",
      price: 228000,
      beds: 2,
      baths: 2,
      sqft: 1400,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.5167, lng: -80.1667 },
      features: ["Modern Appliances", "Pet Friendly", "Parking", "Balcony"],
      status: "For Rent"
    },
    {
      id: 4,
      name: "Fielbrook Dr Property",
      address: "228 Fielbrook Dr, Canonsburg, PA 15317",
      price: 312000,
      beds: 3,
      baths: 2.5,
      sqft: 1950,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.2626, lng: -80.1923 },
      features: ["Large Lot", "Two-Car Garage", "Updated Features", "Fireplace"],
      status: "For Rent"
    },
    {
      id: 5,
      name: "Elm Court Apartment",
      address: "1115 Elm Ct, Oakdale, PA 15071",
      price: 210000,
      beds: 2,
      baths: 1.5,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      coordinates: { lat: 40.3995, lng: -80.1833 },
      features: ["Updated Kitchen", "Cable Ready", "Parking", "Laundry"],
      status: "For Rent"
    }
  ];

  const getDirections = (property: typeof properties[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${property.coordinates.lat},${property.coordinates.lng}`;
    window.open(url, '_blank');
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Create map centered on Pittsburgh
      const map = L.map(mapRef.current).setView([40.4432, -79.9428], 13);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add property markers
      properties.forEach((property, index) => {
        const marker = L.marker([property.coordinates.lat, property.coordinates.lng])
          .addTo(map)
          .bindPopup(`
            <div class="p-2 text-center">
              <h3 class="font-bold text-primary text-sm">${property.name}</h3>
              <p class="text-lg font-bold text-primary">$${(property.price || 0).toLocaleString()}</p>
              <p class="text-xs text-gray-600">${property.beds}B ${property.baths}BA • ${(property.sqft || 0).toLocaleString()} sq ft</p>
            </div>
          `);

        marker.on('click', () => {
          setSelectedProperty(index);
        });

        markersRef.current.push(marker);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, []);

  // Update marker styles when selected property changes
  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      if (index === selectedProperty) {
        marker.setIcon(L.divIcon({
          className: 'custom-marker-selected',
          html: `<div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg">${index + 1}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        }));
      } else {
        marker.setIcon(L.divIcon({
          className: 'custom-marker',
          html: `<div class="w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center font-bold shadow-md border-2 border-primary">${index + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        }));
      }
    });
  }, [selectedProperty]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-indigo-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 pt-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Pittsburgh Real Estate Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Explore our featured properties across Pittsburgh, PA with interactive maps. Click on any property marker to see basic details.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">Pittsburgh, PA</Badge>
            <Badge variant="outline" className="px-4 py-2">Pittsburgh</Badge>
            <Badge variant="outline" className="px-4 py-2">Imperial</Badge>
            <Badge variant="outline" className="px-4 py-2">Coraopolis</Badge>
            <Badge variant="outline" className="px-4 py-2">Canonsburg</Badge>
            <Badge variant="outline" className="px-4 py-2">Oakdale</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto pb-20">
          {/* Map Section */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Property Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  {/* Leaflet Map Container */}
                  <div ref={mapRef} className="w-full h-full rounded-lg"></div>
                  
                  {/* Simple Map Controls */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Pittsburgh, PA</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Pittsburgh Area Rentals
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Powered by OpenStreetMap
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property List */}
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  All Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {properties.map((property, index) => (
                    <div
                      key={property.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedProperty === index 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedProperty(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-primary">{property.name}</h4>
                          <p className="text-xs text-muted-foreground">{property.address}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">${(property.price || 0).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{property.beds}B {property.baths}BA</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
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
                        ${((properties[selectedProperty]?.price) || 0).toLocaleString()}
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
                          <div className="text-sm font-semibold">{((properties[selectedProperty]?.sqft) || 0).toLocaleString()}</div>
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

            {/* Market Overview */}
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
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
                      ${properties.length > 0 ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length).toLocaleString() : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price Range</span>
                    <span className="text-sm font-semibold">
                      {properties.length > 0 ? `$${Math.min(...properties.map(p => p.price || 0)).toLocaleString()} - $${Math.max(...properties.map(p => p.price || 0)).toLocaleString()}` : '$0 - $0'}
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
