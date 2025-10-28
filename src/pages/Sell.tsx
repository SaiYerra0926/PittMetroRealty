import { useState } from "react";
import { Home, DollarSign, MapPin, Calendar, Phone, Mail, CheckCircle, Star, ArrowRight, Users, Award, Clock, User, Building, CreditCard, FileText, Shield, Clock3, Target, TrendingUp, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Sell = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    description: '',
    
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Thank you! We will contact you within 24 hours to discuss your property sale.');
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Shadyside, Pittsburgh",
      text: "Pitt Metro Realty helped us sell our home for 15% above asking price in just 3 weeks!",
      rating: 5,
      salePrice: "$850,000"
    },
    {
      name: "Michael Chen",
      location: "Squirrel Hill, Pittsburgh", 
      text: "Professional service from start to finish. Highly recommend!",
      rating: 5,
      salePrice: "$1.2M"
    },
    {
      name: "Emily Rodriguez",
      location: "Mount Lebanon, Pittsburgh",
      text: "The market analysis was spot-on and helped us price perfectly.",
      rating: 5,
      salePrice: "$675,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="hero-section relative text-white overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="container-spacing relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <DollarSign className="h-4 w-4" />
              Maximize Your Property Value
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sell Your Property
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Get maximum value for your property with our proven selling strategy, 
              expert market analysis, and professional marketing.
            </p>
            
            <div className="flex flex-wrap justify-center button-group-spacing">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <TrendingUp className="h-4 w-4 text-green-300" />
                <span className="font-medium text-sm">Market Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Camera className="h-4 w-4 text-blue-300" />
                <span className="font-medium text-sm">Professional Photos</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Users className="h-4 w-4 text-purple-300" />
                <span className="font-medium text-sm">Expert Agents</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Award className="h-4 w-4 text-yellow-300" />
                <span className="font-medium text-sm">Proven Results</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-16 left-8 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-8 w-24 h-24 bg-yellow-300/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-300/10 rounded-full blur-xl"></div>
      </section>

      {/* Steps Section */}
      <section className="section-spacing-xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
        <div className="relative container-spacing">
          <div className="text-center mb-16">
            
            
          </div>


          {/* Form Content */}
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/75 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 lg:pb-8 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-30 rounded-t-lg border-b border-slate-200">
              <CardTitle className="text-3xl font-bold text-slate-800">
                Personal Information
              </CardTitle>
              <p className="text-slate-600 text-md">
                Tell us about yourself
              </p>
            </CardHeader>
            <CardContent className="card-content-spacing">
              <div className="form-spacing">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Let's Get to Know You</h3>
                    <p className="text-slate-600">We'll use this information to provide personalized service</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
                        First Name *
                      </Label>
                      <Input 
                        id="firstName"
                        placeholder="John" 
                        className={`h-12 border-2 focus:border-primary transition-all duration-300 ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-slate-200'}`}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
                        Last Name *
                      </Label>
                      <Input 
                        id="lastName"
                        placeholder="Doe" 
                        className={`h-12 border-2 focus:border-primary transition-all duration-300 ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-slate-200'}`}
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address *
                      </Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="john@example.com" 
                        className={`h-12 border-2 focus:border-primary transition-all duration-300 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200'}`}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                        Phone Number *
                      </Label>
                      <Input 
                        id="phone"
                        placeholder="+1-412-977-7090" 
                        className={`h-12 border-2 focus:border-primary transition-all duration-300 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-200'}`}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.phone}</p>}
                    </div>
                  </div>
                  

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-semibold text-slate-800">
                      Description *
                      </Label>
                      <Textarea 
                        id="description"
                        placeholder="Tell us about your property and selling requirements..." 
                        className={`min-h-[120px] border-2 focus:border-primary transition-all duration-300 ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-slate-200'}`}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.description}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-slate-700">Preferred Contact Method</Label>
                    <RadioGroup 
                      value={formData.preferredContact} 
                      onValueChange={(value) => handleInputChange('preferredContact', value)}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:shadow-md">
                        <RadioGroupItem value="email" id="email-contact" />
                        <Label htmlFor="email-contact" className="flex items-center gap-2 cursor-pointer">
                          <Mail className="h-4 w-4 text-primary" />
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:shadow-md">
                        <RadioGroupItem value="phone" id="phone-contact" />
                        <Label htmlFor="phone-contact" className="flex items-center gap-2 cursor-pointer">
                          <Phone className="h-4 w-4 text-primary" />
                          Phone Call
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:shadow-md">
                        <RadioGroupItem value="text" id="text-contact" />
                        <Label htmlFor="text-contact" className="flex items-center gap-2 cursor-pointer">
                          <Phone className="h-4 w-4 text-primary" />
                          Text Message
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center pt-8 border-t border-slate-200">
                <Button 
                  onClick={handleSubmit}
                  className="px-12 py-4 h-14 bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  Submit Application
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

     
     


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-light/90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            Ready to Sell Your Property?
          </h2>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">
            Start your selling journey today with Pitt Metro Realty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300">
              <Phone className="h-5 w-5 mr-2" />
              Call +1-412-977-7090
            </Button>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sell;