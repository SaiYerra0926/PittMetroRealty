import { useState, useEffect } from "react";
import { X, SlidersHorizontal, Home, DollarSign, Bed, Bath, Car, MapPin, Calendar, Star, Wifi, Shield, TreePine, Waves, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useWorkflow } from "@/contexts/WorkflowContext";

interface AdvancedFiltersProps {
  onFiltersChange?: (filters: any) => void;
  onClose?: () => void;
}

const AdvancedFilters = ({ onFiltersChange, onClose }: AdvancedFiltersProps) => {
  const { state, actions } = useWorkflow();
  const [filters, setFilters] = useState(state.currentFilters);

  const amenities = [
    { icon: Wifi, label: "High-Speed Internet", category: "Technology" },
    { icon: Shield, label: "Security System", category: "Security" },
    { icon: TreePine, label: "Garden/Landscaping", category: "Outdoor" },
    { icon: Waves, label: "Pool", category: "Recreation" },
    { icon: Car, label: "Parking", category: "Parking" },
    { icon: Star, label: "Gym/Fitness Center", category: "Recreation" },
    { icon: Home, label: "Concierge", category: "Services" },
    { icon: Calendar, label: "Event Space", category: "Recreation" }
  ];

  const features = [
    "Hardwood Floors",
    "Marble Countertops", 
    "Stainless Steel Appliances",
    "Walk-in Closet",
    "Fireplace",
    "Balcony",
    "Deck",
    "Finished Basement",
    "Attic",
    "Central Air",
    "Dishwasher",
    "Washer/Dryer Hookup"
  ];

  const neighborhoods = [
    "Shadyside", "Squirrel Hill", "Mount Lebanon", "Fox Chapel",
    "Lawrenceville", "Regent Square", "East Liberty", "Strip District",
    "Downtown", "South Side", "North Shore", "Oakland"
  ];

  const schoolDistricts = [
    "Pittsburgh Public Schools",
    "Mt. Lebanon School District", 
    "Fox Chapel Area School District",
    "Upper St. Clair School District",
    "North Allegheny School District",
    "Bethel Park School District"
  ];

  const accessibilityFeatures = [
    "Wheelchair Accessible",
    "Elevator Access",
    "Ground Floor Entry",
    "Wide Doorways",
    "Accessible Bathroom",
    "Ramp Access"
  ];

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    actions.updateFilters({ [key]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAccessibilityToggle = (accessibility: string) => {
    setFilters(prev => ({
      ...prev,
      accessibility: prev.accessibility.includes(accessibility)
        ? prev.accessibility.filter(a => a !== accessibility)
        : [...prev.accessibility, accessibility]
    }));
  };

  const applyFilters = () => {
    actions.applyFilters();
    actions.setWorkflowStep('results');
    if (onFiltersChange) onFiltersChange(filters);
    if (onClose) onClose();
  };

  const clearFilters = () => {
    actions.resetFilters();
    setFilters(state.currentFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceMin[0] > 0 || filters.priceMax[0] < 2000000) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.propertyType) count++;
    if (filters.sqftMin || filters.sqftMax) count++;
    if (filters.yearBuiltMin || filters.yearBuiltMax) count++;
    if (filters.neighborhood) count++;
    if (filters.schoolDistrict) count++;
    if (filters.zipCode) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.accessibility.length > 0) count++;
    if (filters.daysOnMarket) count++;
    if (filters.priceReduction || filters.newListing || filters.openHouse) count++;
    return count;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Advanced Filters
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Advanced Property Filters
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Price Range */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Price Range
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Price</label>
                <Slider
                  value={filters.priceMin}
                  onValueChange={(value) => handleFilterChange('priceMin', value)}
                  max={2000000}
                  min={0}
                  step={25000}
                  className="w-full"
                />
                <div className="text-sm text-slate-600">
                  ${filters.priceMin[0].toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Price</label>
                <Slider
                  value={filters.priceMax}
                  onValueChange={(value) => handleFilterChange('priceMax', value)}
                  max={2000000}
                  min={0}
                  step={25000}
                  className="w-full"
                />
                <div className="text-sm text-slate-600">
                  ${filters.priceMax[0].toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                  <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger>
                      <Bed className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Bathrooms</label>
                  <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange('bathrooms', value)}>
                    <SelectTrigger>
                      <Bath className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="1.5">1.5+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                    <SelectTrigger>
                      <Home className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="single">Single Family</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="multi">Multi-Family</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Parking</label>
                  <Select value={filters.parkingSpaces} onValueChange={(value) => handleFilterChange('parkingSpaces', value)}>
                    <SelectTrigger>
                      <Car className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="garage">Garage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Square Footage */}
          <Card>
            <CardHeader>
              <CardTitle>Square Footage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Sq Ft</label>
                  <Input
                    placeholder="e.g., 1000"
                    value={filters.sqftMin}
                    onChange={(e) => handleFilterChange('sqftMin', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Maximum Sq Ft</label>
                  <Input
                    placeholder="e.g., 3000"
                    value={filters.sqftMax}
                    onChange={(e) => handleFilterChange('sqftMax', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Neighborhood</label>
                  <Select value={filters.neighborhood} onValueChange={(value) => handleFilterChange('neighborhood', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Neighborhood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Neighborhood</SelectItem>
                      {neighborhoods.map((neighborhood) => (
                        <SelectItem key={neighborhood} value={neighborhood}>
                          {neighborhood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">School District</label>
                  <Select value={filters.schoolDistrict} onValueChange={(value) => handleFilterChange('schoolDistrict', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any District</SelectItem>
                      {schoolDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ZIP Code</label>
                  <Input
                    placeholder="e.g., 15213"
                    value={filters.zipCode}
                    onChange={(e) => handleFilterChange('zipCode', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {amenities.map((amenity) => (
                  <div
                    key={amenity.label}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      filters.amenities.includes(amenity.label)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleAmenityToggle(amenity.label)}
                  >
                    <div className="flex items-center gap-2">
                      <amenity.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{amenity.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Property Features */}
          <Card>
            <CardHeader>
              <CardTitle>Property Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                      filters.features.includes(feature)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Market Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Days on Market</label>
                  <Select value={filters.daysOnMarket} onValueChange={(value) => handleFilterChange('daysOnMarket', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="7">7 days or less</SelectItem>
                      <SelectItem value="30">30 days or less</SelectItem>
                      <SelectItem value="90">90 days or less</SelectItem>
                      <SelectItem value="180">180 days or less</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priceReduction"
                      checked={filters.priceReduction}
                      onCheckedChange={(checked) => handleFilterChange('priceReduction', checked)}
                    />
                    <label htmlFor="priceReduction" className="text-sm font-medium">
                      Price Reduction
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newListing"
                      checked={filters.newListing}
                      onCheckedChange={(checked) => handleFilterChange('newListing', checked)}
                    />
                    <label htmlFor="newListing" className="text-sm font-medium">
                      New Listing
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="openHouse"
                      checked={filters.openHouse}
                      onCheckedChange={(checked) => handleFilterChange('openHouse', checked)}
                    />
                    <label htmlFor="openHouse" className="text-sm font-medium">
                      Open House Available
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {accessibilityFeatures.map((feature) => (
                  <div
                    key={feature}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                      filters.accessibility.includes(feature)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleAccessibilityToggle(feature)}
                  >
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilters;
