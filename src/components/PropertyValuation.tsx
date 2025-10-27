import { useState } from "react";
import { Calculator, TrendingUp, Home, MapPin, Calendar, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PropertyValuation = () => {
  const [propertyType, setPropertyType] = useState("");

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Free Property Valuation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Get an accurate estimate of your property's current market value with our comprehensive analysis. 
            Professional valuation reports delivered within 24 hours.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">100% Free</Badge>
            <Badge variant="outline" className="px-4 py-2">24hr Delivery</Badge>
            <Badge variant="outline" className="px-4 py-2">Expert Analysis</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Valuation Form */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="property-address">Property Address *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="property-address"
                      placeholder="Enter full property address"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="property-type-val">Property Type *</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label htmlFor="bedrooms-val">Bedrooms</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4 Bedrooms</SelectItem>
                      <SelectItem value="5">5 Bedrooms</SelectItem>
                      <SelectItem value="6+">6+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms-val">Bathrooms</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                      <SelectItem value="4+">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="square-footage">Square Footage</Label>
                  <Input
                    id="square-footage"
                    placeholder="e.g., 2,500"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="lot-size-val">Lot Size (Acres)</Label>
                  <Input
                    id="lot-size-val"
                    placeholder="e.g., 0.25"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="year-built-val">Year Built</Label>
                  <Input
                    id="year-built-val"
                    placeholder="e.g., 1995"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="garage-spaces">Garage Spaces</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No Garage</SelectItem>
                      <SelectItem value="1">1 Car</SelectItem>
                      <SelectItem value="2">2 Car</SelectItem>
                      <SelectItem value="3">3 Car</SelectItem>
                      <SelectItem value="4+">4+ Car</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="additional-features">Additional Features</Label>
                  <Textarea
                    id="additional-features"
                    placeholder="Swimming pool, updated kitchen, hardwood floors, etc."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-primary mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full-name">Full Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="full-name"
                        placeholder="Your full name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone-val">Phone Number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone-val"
                        placeholder="(555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="email-val">Email Address *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email-val"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="luxury" size="lg" className="w-full">
                Get Free Valuation Report
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to receive communications from Amit Agarwal Real Estate.
                You can unsubscribe at any time.
              </p>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="space-y-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Accurate Market Analysis</h3>
                    <p className="text-muted-foreground">
                      Our comprehensive analysis uses recent comparable sales, market trends, and property features to provide you with an accurate valuation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quick Turnaround</h3>
                    <p className="text-muted-foreground">
                      Receive your detailed property valuation report within 24 hours. No waiting, no hassle.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Home className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Expert Consultation</h3>
                    <p className="text-muted-foreground">
                      Get a follow-up consultation with Amit Agarwal to discuss your property's potential and market opportunities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-primary text-white p-8 rounded-xl">
              <h3 className="text-2xl font-serif font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  15+ years of local market expertise
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  500+ successful property transactions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Award-winning real estate professional
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Personalized service and attention
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyValuation;