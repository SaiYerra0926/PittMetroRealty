import { useState } from "react";
import { Search, MapPin, Home, DollarSign, Bed, Bath, Star, Heart, Share2, Calendar, Phone, User, Building2, Eye, CheckCircle, FileText, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Buy = () => {
  const [buyerInfo, setBuyerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    preferredAreas: "",
    financing: "",
    firstTimeBuyer: false,
    additionalInfo: ""
  });

  const properties = [
    {
      id: 1,
      price: "$850,000",
      address: "123 Oak Street, Shadyside, Pittsburgh",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,500",
      type: "Single Family",
      yearBuilt: 2018,
      features: ["Garage", "Garden", "Updated Kitchen", "Hardwood Floors", "Central AC"],
      status: "For Sale",
      daysOnMarket: 12,
      rating: 4.8,
      agent: "Sarah Johnson",
      agentPhone: "(412) 555-0101",
      agentEmail: "sarah@pittmetro.com",
      owner: {
        name: "Michael & Jennifer Chen",
        phone: "(412) 555-0201",
        email: "chen.family@email.com",
        preferredContact: "phone",
        reasonForSelling: "Relocating for work",
        timeOwned: "3 years",
        propertyCondition: "Excellent"
      },
      description: "Beautiful single-family home in the heart of Shadyside. Features modern kitchen with granite countertops, spacious living areas, and a private backyard perfect for entertaining.",
      highlights: ["Recently renovated", "Prime location", "Excellent schools nearby", "Walk to shops and restaurants"],
      propertyTax: "$8,500/year",
      hoaFee: "None",
      utilities: "Gas heating, Central AC, City water/sewer",
      mortgageInfo: "Seller financing available",
      specialTerms: "Flexible closing date"
    },
    {
      id: 2,
      price: "$675,000",
      address: "456 Maple Avenue, Squirrel Hill, Pittsburgh",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "1,800",
      type: "Townhouse",
      yearBuilt: 2020,
      features: ["Balcony", "Modern Design", "Parking", "In-unit Laundry", "Pet Friendly"],
      status: "For Sale",
      daysOnMarket: 8,
      rating: 4.9,
      agent: "David Rodriguez",
      agentPhone: "(412) 555-0102",
      agentEmail: "david@pittmetro.com",
      owner: {
        name: "Lisa Thompson",
        phone: "(412) 555-0202",
        email: "lisa.thompson@email.com",
        preferredContact: "email",
        reasonForSelling: "Downsizing",
        timeOwned: "2 years",
        propertyCondition: "Like new"
      },
      description: "Contemporary townhouse with open-concept living, modern finishes, and convenient access to public transportation and local amenities.",
      highlights: ["New construction", "Energy efficient", "Low maintenance", "Great investment potential"],
      propertyTax: "$6,200/year",
      hoaFee: "$150/month",
      utilities: "Electric heating, Central AC, City water/sewer",
      mortgageInfo: "Conventional financing preferred",
      specialTerms: "Quick closing preferred"
    },
    {
      id: 3,
      price: "$1,200,000",
      address: "789 Pine Road, Mount Lebanon, Pittsburgh",
      bedrooms: 5,
      bathrooms: 4,
      sqft: "3,200",
      type: "Single Family",
      yearBuilt: 2015,
      features: ["Pool", "Fireplace", "Walk-in Closet", "Finished Basement", "Three-Car Garage"],
      status: "For Sale",
      daysOnMarket: 15,
      rating: 4.7,
      agent: "Emily Chen",
      agentPhone: "(412) 555-0103",
      agentEmail: "emily@pittmetro.com",
      owner: {
        name: "Robert & Patricia Williams",
        phone: "(412) 555-0203",
        email: "williams.family@email.com",
        preferredContact: "phone",
        reasonForSelling: "Retirement downsizing",
        timeOwned: "8 years",
        propertyCondition: "Excellent"
      },
      description: "Luxury family home with resort-style amenities. Features a stunning pool area, gourmet kitchen, and spacious master suite with walk-in closet.",
      highlights: ["Luxury finishes", "Pool and spa", "Large lot", "Premium neighborhood"],
      propertyTax: "$12,800/year",
      hoaFee: "None",
      utilities: "Gas heating, Central AC, Well water, Septic system",
      mortgageInfo: "Cash offers preferred",
      specialTerms: "Seller will consider rent-back"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary via-primary-light to-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Home className="h-4 w-4" />
              Find Your Dream Home
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Home Today
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Explore premium properties in Pittsburgh with expert guidance, 
              transparent pricing, and exceptional service.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="font-medium text-sm">Verified Properties</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Calendar className="h-4 w-4 text-yellow-300" />
                <span className="font-medium text-sm">Quick Process</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <User className="h-4 w-4 text-blue-300" />
                <span className="font-medium text-sm">Expert Agents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Tell Us About Your Home Buying Needs
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Help us find the perfect property for you by sharing your preferences and requirements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Buyer Form */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <User className="h-6 w-6" />
                  Buyer Information
                </CardTitle>
                <p className="text-white/90">We'll use this information to match you with the best properties</p>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700 mb-2 block">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={buyerInfo.firstName}
                          onChange={(e) => setBuyerInfo({...buyerInfo, firstName: e.target.value})}
                          className="h-12 border-2 border-slate-200 focus:border-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700 mb-2 block">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={buyerInfo.lastName}
                          onChange={(e) => setBuyerInfo({...buyerInfo, lastName: e.target.value})}
                          className="h-12 border-2 border-slate-200 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={buyerInfo.email}
                          onChange={(e) => setBuyerInfo({...buyerInfo, email: e.target.value})}
                          className="h-12 border-2 border-slate-200 focus:border-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+1-412-977-7090"
                          value={buyerInfo.phone}
                          onChange={(e) => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                          className="h-12 border-2 border-slate-200 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Preferences */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      Property Preferences
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="budget" className="text-sm font-semibold text-slate-700 mb-2 block">Budget Range</Label>
                        <Select value={buyerInfo.budget} onValueChange={(value) => setBuyerInfo({...buyerInfo, budget: value})}>
                          <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-primary">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-300k">Under $300K</SelectItem>
                            <SelectItem value="300k-500k">$300K - $500K</SelectItem>
                            <SelectItem value="500k-750k">$500K - $750K</SelectItem>
                            <SelectItem value="750k-1m">$750K - $1M</SelectItem>
                            <SelectItem value="1m-1.5m">$1M - $1.5M</SelectItem>
                            <SelectItem value="over-1.5m">Over $1.5M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline" className="text-sm font-semibold text-slate-700 mb-2 block">Timeline</Label>
                        <Select value={buyerInfo.timeline} onValueChange={(value) => setBuyerInfo({...buyerInfo, timeline: value})}>
                          <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-primary">
                            <SelectValue placeholder="When do you want to buy?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediately">Immediately</SelectItem>
                            <SelectItem value="1-3-months">1-3 months</SelectItem>
                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                            <SelectItem value="6-12-months">6-12 months</SelectItem>
                            <SelectItem value="over-1-year">Over 1 year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="preferredAreas" className="text-sm font-semibold text-slate-700 mb-2 block">Preferred Areas</Label>
                      <Input
                        id="preferredAreas"
                        placeholder="e.g., Shadyside, Squirrel Hill, Mount Lebanon"
                        value={buyerInfo.preferredAreas}
                        onChange={(e) => setBuyerInfo({...buyerInfo, preferredAreas: e.target.value})}
                        className="h-12 border-2 border-slate-200 focus:border-primary"
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo" className="text-sm font-semibold text-slate-700 mb-2 block">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Tell us about any specific requirements, must-haves, or deal-breakers..."
                        value={buyerInfo.additionalInfo}
                        onChange={(e) => setBuyerInfo({...buyerInfo, additionalInfo: e.target.value})}
                        className="min-h-[120px] border-2 border-slate-200 focus:border-primary"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="firstTimeBuyer"
                        checked={buyerInfo.firstTimeBuyer}
                        onCheckedChange={(checked) => setBuyerInfo({...buyerInfo, firstTimeBuyer: checked as boolean})}
                        className="h-5 w-5"
                      />
                      <Label htmlFor="firstTimeBuyer" className="text-sm text-slate-700 font-medium">
                        I am a first-time home buyer
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg">
                    <FileText className="h-5 w-5 mr-2" />
                    Submit Buyer Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Featured Properties from Owners
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover premium properties listed directly by owners across Pittsburgh's most desirable neighborhoods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
              <Card key={property.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white border-0 shadow-lg hover:-translate-y-2">
                <div className="relative">
                  {/* Beautiful Property Header */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-slate-50 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Home className="h-10 w-10 text-primary" />
                      </div>
                      <div className="text-lg font-bold text-slate-800">{property.type}</div>
                      <div className="text-sm text-slate-600">{property.yearBuilt}</div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/90 hover:bg-white shadow-sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/90 hover:bg-white shadow-sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary text-white px-3 py-1 shadow-sm">
                      {property.status}
                    </Badge>
                    <Badge variant="outline" className="absolute bottom-4 left-4 bg-white/90 text-slate-700 shadow-sm">
                      {property.type}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-3xl font-bold text-primary">
                      {property.price}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-600 font-medium">{property.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                    {property.address}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {property.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-primary" />
                      <span className="font-medium">{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 text-primary" />
                      <span className="font-medium">{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-primary" />
                      <span className="font-medium">{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {highlight}
                      </Badge>
                    ))}
                    {property.highlights.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.highlights.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Owner Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-slate-800">Property Owner</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="font-medium text-slate-700">{property.owner.name}</div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-3 w-3" />
                        <span>{property.owner.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="h-3 w-3" />
                        <span className="truncate">{property.owner.email}</span>
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium">Reason for selling:</span> {property.owner.reasonForSelling}
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium">Owned for:</span> {property.owner.timeOwned}
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium">Condition:</span> {property.owner.propertyCondition}
                      </div>
                    </div>
                  </div>

                  {/* Agent Information */}
                  <div className="bg-slate-50 rounded-lg p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-slate-800">Listing Agent</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="font-medium text-slate-700">{property.agent}</div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-3 w-3" />
                        <span>{property.agentPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="h-3 w-3" />
                        <span className="truncate">{property.agentEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Terms */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-semibold text-yellow-800">Special Terms</span>
                    </div>
                    <div className="text-sm text-yellow-700 space-y-2">
                      <div><span className="font-medium">Financing:</span> {property.mortgageInfo}</div>
                      <div><span className="font-medium">Terms:</span> {property.specialTerms}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                    <div className="text-sm text-slate-600">
                      Listed {property.daysOnMarket} days ago
                    </div>
                    <div className="text-sm font-medium text-slate-800">
                      Built {property.yearBuilt}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 h-12">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Tour
                    </Button>
                    <Button variant="outline" className="flex-1 hover:bg-primary hover:text-white h-12">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need Help Finding Your Perfect Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our expert team is here to guide you through every step of the home buying process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Phone className="h-5 w-5 mr-2" />
              Call +1-412-977-7090
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buy;