import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Phone, Mail, Home, DollarSign, Bed, Bath } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropertiesAPI } from '@/lib/api/properties';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Property {
  id: string | number;
  title?: string;
  name?: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  price: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  baths?: number;
  squareFeet?: number;
  sqft?: number;
  photos?: Array<{ url: string; name?: string }>;
  image?: string;
  images?: string[];
  features?: string[];
  listingType?: 'rent' | 'sell' | 'buy';
  status?: string;
  coordinates?: { lat: number; lng: number };
  latitude?: number;
  longitude?: number;
  geocoded?: boolean; // Track if coordinates were geocoded from address
}

const PropertyMap = () => {
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const propertiesApi = new PropertiesAPI();

  // Helper function to get image source
  const getImageSrc = (property: Property): string => {
    if (property.photos && property.photos.length > 0) {
      const photo = property.photos[0];
      if (photo.url) {
        if (photo.url.startsWith('data:image') || photo.url.startsWith('http://') || photo.url.startsWith('https://')) {
          return photo.url;
        }
        return `data:image/jpeg;base64,${photo.url}`;
      }
    }
    if (property.image) {
      if (property.image.startsWith('data:image') || property.image.startsWith('http://') || property.image.startsWith('https://')) {
        return property.image;
      }
      return `data:image/jpeg;base64,${property.image}`;
    }
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    return 'https://via.placeholder.com/800x600?text=No+Image';
  };

  // Professional geocoding function with retry logic and better address formatting
  const geocodeAddress = async (
    address: string, 
    city?: string, 
    state?: string, 
    zipCode?: string,
    retryCount: number = 0
  ): Promise<{ lat: number; lng: number } | null> => {
    if (!address || address.trim() === '') {
      return null;
    }

    try {
      // Build full address with proper formatting
      const addressParts: string[] = [];
      if (address) addressParts.push(address.trim());
      if (city) addressParts.push(city.trim());
      if (state) addressParts.push(state.trim());
      if (zipCode) addressParts.push(zipCode.trim());
      
      const fullAddress = addressParts.join(', ');
      
      if (fullAddress.trim() === '') {
        return null;
      }

      // Use Nominatim API with proper rate limiting
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'PittMetroRealty/1.0 (Property Mapping Service)',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Geocoding API returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (data && Array.isArray(data) && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // Validate coordinates
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          return { lat, lng };
        }
      }

      // Retry with simplified address if first attempt fails
      if (retryCount === 0 && city && state) {
        // Try with just city and state
        return await geocodeAddress('', city, state, zipCode, 1);
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      // Retry once on network errors
      if (retryCount === 0 && error instanceof TypeError) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return await geocodeAddress(address, city, state, zipCode, 1);
      }
      return null;
    }
  };

  // Fetch properties from API with geocoding
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Fetch all published properties (rent, sell, buy)
        const [rentResponse, sellResponse, buyResponse] = await Promise.all([
          propertiesApi.getPublishedProperties('rent').catch(() => ({ listings: [] })),
          propertiesApi.getPublishedProperties('sell').catch(() => ({ listings: [] })),
          propertiesApi.getPublishedProperties('buy').catch(() => ({ listings: [] }))
        ]);
        
        // Combine all listings
        const allListings = [
          ...(rentResponse.listings || []),
          ...(sellResponse.listings || []),
          ...(buyResponse.listings || [])
        ];
        
        // Process and geocode properties with better error handling
        const processedProperties = await Promise.all(
          allListings.map(async (prop: any, index: number) => {
            // Check for existing coordinates first
            let coordinates = prop.coordinates || 
              (prop.latitude && prop.longitude 
                ? { lat: parseFloat(prop.latitude), lng: parseFloat(prop.longitude) } 
                : null);
            
            // Validate existing coordinates
            if (coordinates && (isNaN(coordinates.lat) || isNaN(coordinates.lng) || 
                coordinates.lat < -90 || coordinates.lat > 90 || 
                coordinates.lng < -180 || coordinates.lng > 180)) {
              coordinates = null;
            }
            
            // If no valid coordinates, geocode the address
            if (!coordinates && prop.address) {
              // Add small delay to respect rate limits (1 request per second)
              if (index > 0) {
                await new Promise(resolve => setTimeout(resolve, 1100));
              }
              
              coordinates = await geocodeAddress(
                prop.address, 
                prop.city, 
                prop.state, 
                prop.zipCode
              );
            }
            
            // Only use default Pittsburgh coordinates if we have no address to geocode
            // This ensures properties with addresses are properly geocoded
            if (!coordinates) {
              // If we have an address but geocoding failed, log it but don't show on map
              if (prop.address) {
                console.warn(`Failed to geocode address: ${prop.address}, ${prop.city}, ${prop.state}`);
                // Return null coordinates so property is skipped
                return null;
              }
              // Only use default for properties without addresses
              coordinates = { lat: 40.4432, lng: -79.9428 };
            }
            
            return {
              id: prop.id,
              title: prop.title,
              name: prop.title,
              address: prop.address || '',
              city: prop.city,
              state: prop.state,
              zipCode: prop.zipCode,
              price: prop.price || 0,
              bedrooms: prop.bedrooms,
              beds: prop.bedrooms,
              bathrooms: prop.bathrooms,
              baths: prop.bathrooms,
              squareFeet: prop.squareFeet,
              sqft: prop.squareFeet,
              photos: prop.photos || [],
              image: prop.photos && prop.photos.length > 0 ? prop.photos[0].url : undefined,
              features: prop.features || [],
              listingType: prop.listingType || 'rent',
              status: prop.status || 'active',
              coordinates,
              geocoded: !prop.coordinates && !prop.latitude && !prop.longitude // Track if we geocoded it
            };
          })
        );
        
        // Filter out null properties (failed geocoding with address)
        const validProperties = processedProperties.filter((p): p is Property => p !== null);
        
        setProperties(validProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getDirections = (property: Property) => {
    if (property.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${property.coordinates.lat},${property.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  // Initialize and update Leaflet map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Create map centered on Pittsburgh
      const map = L.map(mapRef.current).setView([40.4432, -79.9428], 13);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstanceRef.current || properties.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach((property, index) => {
      if (property.coordinates) {
        const marker = L.marker([property.coordinates.lat, property.coordinates.lng])
          .addTo(mapInstanceRef.current!)
          .bindPopup(`
            <div class="p-2 text-center">
              <h3 class="font-bold text-primary text-sm">${property.name || property.title || 'Property'}</h3>
              <p class="text-lg font-bold text-primary">$${(property.price || 0).toLocaleString()}</p>
              <p class="text-xs text-gray-600">${property.beds || property.bedrooms || 0}B ${property.baths || property.bathrooms || 0}BA • ${(property.sqft || property.squareFeet || 0).toLocaleString()} sq ft</p>
            </div>
          `);

        marker.on('click', () => {
          setSelectedProperty(index);
        });

        markersRef.current.push(marker);
      }
    });

    // Fit map to show all markers
    if (properties.length > 0 && properties.some(p => p.coordinates)) {
      const bounds = L.latLngBounds(
        properties
          .filter(p => p.coordinates)
          .map(p => [p.coordinates!.lat, p.coordinates!.lng] as [number, number])
      );
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties]);

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
    <section className="relative bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-indigo-50/20 py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 max-w-6xl w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 pt-20 sm:pt-22">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4 md:mb-5 animate-fade-in-up px-2">
            Pittsburgh Real Estate Map
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay px-4">
            Explore our featured properties across Pittsburgh, PA with interactive maps. Click on any property marker to see basic details.
          </p>
          {isLoading && (
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground animate-fade-in-up-delay">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Loading properties and geocoding addresses...</span>
            </div>
          )}
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 animate-fade-in-up-delay px-2">
            <Badge variant="outline" className="px-4 py-2">Pittsburgh, PA</Badge>
            <Badge variant="outline" className="px-4 py-2">Pittsburgh</Badge>
            <Badge variant="outline" className="px-4 py-2">Imperial</Badge>
            <Badge variant="outline" className="px-4 py-2">Coraopolis</Badge>
            <Badge variant="outline" className="px-4 py-2">Canonsburg</Badge>
            <Badge variant="outline" className="px-4 py-2">Oakdale</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto pb-6 sm:pb-8 md:pb-10 w-full items-stretch">
          {/* Map Section */}
          <div className="space-y-4 sm:space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
              <CardHeader className="p-3 sm:p-4 md:p-5">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Property Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[350px] sm:h-[400px] md:h-[450px] rounded-lg overflow-hidden">
                  {/* Leaflet Map Container */}
                  <div ref={mapRef} className="w-full h-full rounded-lg"></div>
                  
                  {/* Simple Map Controls */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Pittsburgh, PA</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Listed
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
              <CardHeader className="p-3 sm:p-4 md:p-5">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  All Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-5">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Loading properties...</p>
                  </div>
                ) : properties.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No properties available</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[280px] sm:max-h-[320px] md:max-h-[360px] overflow-y-auto">
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
                            <h4 className="font-semibold text-sm text-primary">{property.name || property.title || 'Property'}</h4>
                            <p className="text-xs text-muted-foreground">{property.address}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">${(property.price || 0).toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{property.beds || property.bedrooms || 0}B {property.baths || property.bathrooms || 0}BA</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <div className="space-y-4 sm:space-y-5">
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
              <CardHeader className="p-3 sm:p-4 md:p-5">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-5">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Loading property details...</p>
                  </div>
                ) : properties[selectedProperty] ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={getImageSrc(properties[selectedProperty])} 
                        alt={properties[selectedProperty].name || properties[selectedProperty].title || 'Property'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">
                        {properties[selectedProperty].name || properties[selectedProperty].title || 'Property'}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
                        {properties[selectedProperty].address}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-4 sm:mb-5">
                        <Badge variant={properties[selectedProperty].status === "For Sale" ? "default" : "secondary"} className="text-xs sm:text-sm">
                          {properties[selectedProperty].listingType === 'rent' ? 'For Rent' : properties[selectedProperty].listingType === 'sell' ? 'For Sale' : properties[selectedProperty].status || 'Active'}
                        </Badge>
                      </div>
                      
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-5">
                        ${((properties[selectedProperty]?.price) || 0).toLocaleString()}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
                        <div className="text-center">
                          <Bed className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <div className="text-sm font-semibold">{properties[selectedProperty].beds || properties[selectedProperty].bedrooms || 0}</div>
                          <div className="text-xs text-muted-foreground">Beds</div>
                        </div>
                        <div className="text-center">
                          <Bath className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <div className="text-sm font-semibold">{properties[selectedProperty].baths || properties[selectedProperty].bathrooms || 0}</div>
                          <div className="text-xs text-muted-foreground">Baths</div>
                        </div>
                        <div className="text-center">
                          <DollarSign className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <div className="text-sm font-semibold">{((properties[selectedProperty]?.sqft || properties[selectedProperty]?.squareFeet) || 0).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Sq Ft</div>
                        </div>
                      </div>
                      
                      {properties[selectedProperty].features && properties[selectedProperty].features.length > 0 && (
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
                      )}
                      
                      <div className="space-y-2">
                        {properties[selectedProperty].coordinates && (
                          <Button 
                            onClick={() => getDirections(properties[selectedProperty])}
                            className="w-full"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        )}
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Agent
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No property selected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Market Overview */}
            <Card className="shadow-professional hover:shadow-professional-hover section-transition animate-fade-in-up">
              <CardContent className="p-3 sm:p-4 md:p-5">
                <h4 className="font-semibold text-primary mb-3 sm:mb-4 text-lg sm:text-xl">Market Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Properties Listed</span>
                    <span className="text-sm font-semibold">{properties.length}</span>
                  </div>
                  {properties.length > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Price</span>
                        <span className="text-sm font-semibold">
                          ${Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price Range</span>
                        <span className="text-sm font-semibold">
                          ${Math.min(...properties.map(p => p.price || 0)).toLocaleString()} - ${Math.max(...properties.map(p => p.price || 0)).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
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
