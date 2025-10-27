import { useState, useEffect } from "react";
import { MapPin, Home, DollarSign, Bed, Bath, Car, Star, Heart, Share2, Calendar, Phone, Mail, Filter, Layers, Navigation, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MapView = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapView, setMapView] = useState("satellite");
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // Completely take over the page
  useEffect(() => {
    // Hide everything
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    // Hide the root element
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'none';
    }
    
    return () => {
      // Restore everything
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      
      document.documentElement.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      
      if (root) {
        root.style.display = '';
      }
    };
  }, []);

  const properties = [
    {
      id: 1,
      coordinates: { lat: 40.4406, lng: -79.9959 },
      price: "$850,000",
      address: "123 Oak Street, Shadyside, Pittsburgh",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,500",
      type: "Single Family",
      yearBuilt: 2018,
      features: ["Garage", "Garden", "Updated Kitchen"],
      status: "For Sale",
      daysOnMarket: 12,
      rating: 4.8,
      agent: "Pitt Metro Realty",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      coordinates: { lat: 40.4331, lng: -79.9234 },
      price: "$675,000",
      address: "456 Maple Avenue, Squirrel Hill, Pittsburgh",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "1,800",
      type: "Townhouse",
      yearBuilt: 2020,
      features: ["Balcony", "Modern Design", "Parking"],
      status: "For Sale",
      daysOnMarket: 8,
      rating: 4.9,
      agent: "Pitt Metro Realty",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      coordinates: { lat: 40.3756, lng: -80.0494 },
      price: "$1,200,000",
      address: "789 Pine Road, Mount Lebanon, Pittsburgh",
      bedrooms: 5,
      bathrooms: 4,
      sqft: "3,200",
      type: "Single Family",
      yearBuilt: 2015,
      features: ["Pool", "Fireplace", "Walk-in Closet"],
      status: "For Sale",
      daysOnMarket: 15,
      rating: 4.7,
      agent: "Pitt Metro Realty",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      coordinates: { lat: 40.4618, lng: -79.9632 },
      price: "$450,000",
      address: "321 Elm Street, Lawrenceville, Pittsburgh",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1,200",
      type: "Condominium",
      yearBuilt: 2019,
      features: ["City View", "Gym", "Concierge"],
      status: "For Sale",
      daysOnMarket: 5,
      rating: 4.6,
      agent: "Pitt Metro Realty",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      coordinates: { lat: 40.5134, lng: -79.8902 },
      price: "$950,000",
      address: "654 Cedar Lane, Fox Chapel, Pittsburgh",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,800",
      type: "Single Family",
      yearBuilt: 2017,
      features: ["Deck", "Finished Basement", "Two-Car Garage"],
      status: "For Sale",
      daysOnMarket: 20,
      rating: 4.8,
      agent: "Pitt Metro Realty",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      coordinates: { lat: 40.4218, lng: -79.8967 },
      price: "$580,000",
      address: "987 Birch Boulevard, Regent Square, Pittsburgh",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "1,900",
      type: "Single Family",
      yearBuilt: 2016,
      features: ["Hardwood Floors", "Updated Bathrooms", "Large Yard"],
      status: "For Sale",
      daysOnMarket: 7,
      rating: 4.9,
      agent: "Pitt Metro Realty",
      image: "/api/placeholder/300/200"
    }
  ];

  const neighborhoods = [
    { name: "Shadyside", coordinates: { lat: 40.4406, lng: -79.9959 }, avgPrice: "$750K", properties: 45 },
    { name: "Squirrel Hill", coordinates: { lat: 40.4331, lng: -79.9234 }, avgPrice: "$650K", properties: 38 },
    { name: "Mount Lebanon", coordinates: { lat: 40.3756, lng: -80.0494 }, avgPrice: "$850K", properties: 52 },
    { name: "Fox Chapel", coordinates: { lat: 40.5134, lng: -79.8902 }, avgPrice: "$1.2M", properties: 28 },
    { name: "Lawrenceville", coordinates: { lat: 40.4618, lng: -79.9632 }, avgPrice: "$400K", properties: 67 },
    { name: "Regent Square", coordinates: { lat: 40.4218, lng: -79.8967 }, avgPrice: "$550K", properties: 31 }
  ];

  const mapLayers = [
    { id: "satellite", label: "Satellite", icon: Layers },
    { id: "street", label: "Street", icon: Navigation },
    { id: "terrain", label: "Terrain", icon: MapPin }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        overflow: 'hidden',
        zIndex: 999999,
        margin: 0,
        padding: 0
      }}
    >
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Property Map</h1>
          <Badge variant="outline">{properties.length} Properties</Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div style={{
        position: 'absolute',
        top: '64px',
        left: 0,
        right: '320px',
        bottom: 0,
        backgroundColor: '#e5e7eb'
      }}>
        {/* Map Controls */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Card style={{ padding: '8px', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {mapLayers.map((layer) => (
                <Button
                  key={layer.id}
                  variant={mapView === layer.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView(layer.id)}
                >
                  <layer.icon className="h-3 w-3" />
                </Button>
              ))}
            </div>
          </Card>
          
          <Card style={{ padding: '8px', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Button variant="outline" size="sm">
                <ZoomIn className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Map Content */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Property Markers */}
          {properties.map((property) => (
            <div
              key={property.id}
              style={{
                position: 'absolute',
                left: `${20 + (property.id * 15)}%`,
                top: `${30 + (property.id * 10)}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProperty(property)}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #3b82f6',
                backgroundColor: selectedProperty?.id === property.id ? '#3b82f6' : 'white',
                color: selectedProperty?.id === property.id ? 'white' : '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Home className="h-4 w-4" />
              </div>
            </div>
          ))}

          {/* Map Center Content */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '400px'
            }}>
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Interactive Property Map</h2>
              <p className="text-slate-600 mb-4">
                Click on property markers to view details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'absolute',
        top: '64px',
        right: 0,
        width: '320px',
        height: 'calc(100vh - 64px)',
        backgroundColor: 'white',
        borderLeft: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <Tabs defaultValue="properties" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              <Input placeholder="Search properties..." className="mb-4" />
              
              {properties.map((property) => (
                <Card 
                  key={property.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProperty?.id === property.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProperty(property)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                        <Home className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-lg font-bold text-primary">
                            {property.price}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-slate-600">{property.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-1 truncate">
                          {property.address}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {property.bedrooms}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {property.bathrooms}
                          </div>
                          <div className="flex items-center gap-1">
                            <Home className="h-3 w-3" />
                            {property.sqft}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {property.status}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {property.daysOnMarket} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="neighborhoods" className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {neighborhoods.map((neighborhood, index) => (
                <Card key={neighborhood.name} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {neighborhood.name}
                      </h3>
                      <div className="text-sm font-bold text-primary">
                        {neighborhood.avgPrice}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Average Price
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mb-2">
                      {neighborhood.properties} Properties
                    </div>
                    <div className="text-sm text-slate-600 mb-4">
                      Available Now
                    </div>
                    <Button size="sm" className="w-full">
                      View Properties
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Property Details</h2>
                <Button variant="outline" size="sm" onClick={() => setSelectedProperty(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                  <Home className="h-16 w-16 text-slate-400" />
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="text-3xl font-bold text-primary">
                    {selectedProperty.price}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-slate-600">{selectedProperty.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-800">
                  {selectedProperty.address}
                </h3>
                
                <div className="flex items-center gap-6 text-slate-600">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {selectedProperty.bedrooms} Bedrooms
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {selectedProperty.bathrooms} Bathrooms
                  </div>
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    {selectedProperty.sqft} sqft
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProperty.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Tour
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapView;