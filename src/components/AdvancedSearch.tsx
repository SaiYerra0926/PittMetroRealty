import { useState } from "react";
import { Search, Filter, X, Calendar, Square, Car, Trees, Waves, Zap, Shield, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const AdvancedSearch = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([200000, 2000000]);
  const [sqftRange, setSqftRange] = useState([1000, 5000]);

  const amenities = [
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "garage", label: "Garage/Parking", icon: Car },
    { id: "garden", label: "Garden/Yard", icon: Trees },
    { id: "security", label: "Security System", icon: Shield },
    { id: "gym", label: "Gym/Fitness", icon: Zap },
    { id: "view", label: "Mountain/City View", icon: Mountain },
  ];

  const specialtyRooms = [
    "Home Office", "Media Room", "Wine Cellar", "Library", "Game Room",
    "Guest House", "Workshop", "Studio", "Basement", "Attic"
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="shadow-luxury">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-serif text-primary">
                Find Your Perfect Property
              </CardTitle>
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showAdvanced ? "Hide" : "Show"} Advanced Filters
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Basic Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter city, neighborhood, or zip code"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="property-type">Property Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Property Types</SelectItem>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land/Lot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="listing-status">Listing Status</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="For Sale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                    <SelectItem value="sold">Recently Sold</SelectItem>
                    <SelectItem value="pre-construction">Pre-Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="space-y-6 pt-6 border-t border-border">
                {/* Price Range */}
                <div>
                  <Label className="text-base font-semibold">Price Range</Label>
                  <div className="mt-4 px-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000000}
                      min={50000}
                      step={25000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Beds, Baths, Square Footage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1+">1+</SelectItem>
                        <SelectItem value="2+">2+</SelectItem>
                        <SelectItem value="3+">3+</SelectItem>
                        <SelectItem value="4+">4+</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1+">1+</SelectItem>
                        <SelectItem value="1.5+">1.5+</SelectItem>
                        <SelectItem value="2+">2+</SelectItem>
                        <SelectItem value="2.5+">2.5+</SelectItem>
                        <SelectItem value="3+">3+</SelectItem>
                        <SelectItem value="4+">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="stories">Stories</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Story</SelectItem>
                        <SelectItem value="2">2 Stories</SelectItem>
                        <SelectItem value="3+">3+ Stories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Square Footage */}
                <div>
                  <Label className="text-base font-semibold">Square Footage</Label>
                  <div className="mt-4 px-3">
                    <Slider
                      value={sqftRange}
                      onValueChange={setSqftRange}
                      max={10000}
                      min={500}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{sqftRange[0].toLocaleString()} sq ft</span>
                      <span>{sqftRange[1].toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="year-built">Year Built</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Year</SelectItem>
                        <SelectItem value="2020+">2020 or newer</SelectItem>
                        <SelectItem value="2010+">2010 or newer</SelectItem>
                        <SelectItem value="2000+">2000 or newer</SelectItem>
                        <SelectItem value="1990+">1990 or newer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="lot-size">Lot Size</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Size</SelectItem>
                        <SelectItem value="0.25+">0.25+ Acres</SelectItem>
                        <SelectItem value="0.5+">0.5+ Acres</SelectItem>
                        <SelectItem value="1+">1+ Acres</SelectItem>
                        <SelectItem value="2+">2+ Acres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="garage">Garage</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1+">1+ Car</SelectItem>
                        <SelectItem value="2+">2+ Car</SelectItem>
                        <SelectItem value="3+">3+ Car</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="days-listed">Days on Market</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90+ Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Amenities & Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox id={amenity.id} />
                        <Label 
                          htmlFor={amenity.id} 
                          className="text-sm flex items-center gap-2 cursor-pointer"
                        >
                          <amenity.icon className="h-4 w-4" />
                          {amenity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialty Rooms */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Specialty Rooms</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {specialtyRooms.map((room) => (
                      <div key={room} className="flex items-center space-x-2">
                        <Checkbox id={room} />
                        <Label htmlFor={room} className="text-sm cursor-pointer">
                          {room}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              <Button variant="luxury" size="lg" className="flex-1 sm:flex-none">
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
              <Button variant="outline" size="lg">
                Save Search
              </Button>
              <Button variant="outline" size="lg">
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedSearch;