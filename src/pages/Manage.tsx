import { useState } from "react";
import { Home, DollarSign, Users, Calendar, Phone, Mail, CheckCircle, Star, ArrowRight, Shield, Wrench, FileText, BarChart3, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Manage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Property Information", description: "Tell us about your property" },
    { id: 2, title: "Management Plan", description: "Choose your service level" },
    { id: 3, title: "Tenant Screening", description: "Set your tenant criteria" },
    { id: 4, title: "Get Started", description: "Complete your setup" }
  ];

  const services = [
    {
      icon: Users,
      title: "Tenant Management",
      description: "Complete tenant screening, onboarding, and ongoing support",
      features: ["Background checks", "Lease agreements", "Rent collection", "Tenant communication"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Repairs",
      description: "24/7 maintenance support with trusted contractors",
      features: ["Emergency repairs", "Preventive maintenance", "Vendor management", "Quality control"]
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Comprehensive financial reporting and rent collection",
      features: ["Rent collection", "Financial reporting", "Expense tracking", "Tax documentation"]
    },
    {
      icon: Shield,
      title: "Legal Compliance",
      description: "Stay compliant with all local and federal regulations",
      features: ["Legal updates", "Compliance monitoring", "Documentation", "Risk management"]
    }
  ];

  const managementPlans = [
    {
      name: "Full Service",
      price: "8%",
      description: "Complete property management solution",
      features: [
        "Tenant screening & placement",
        "Rent collection & accounting",
        "Maintenance coordination",
        "Legal compliance",
        "24/7 emergency support",
        "Monthly reporting",
        "Property marketing",
        "Lease renewals"
      ],
      popular: true
    },
    {
      name: "Essential",
      price: "6%",
      description: "Core management services",
      features: [
        "Tenant screening",
        "Rent collection",
        "Basic maintenance",
        "Monthly reporting",
        "Property marketing"
      ],
      popular: false
    },
    {
      name: "Maintenance Only",
      price: "4%",
      description: "Maintenance and repair services",
      features: [
        "Maintenance coordination",
        "Emergency repairs",
        "Vendor management",
        "Work order tracking"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Robert Wilson",
      location: "Oakland, Pittsburgh",
      text: "Pitt Metro Realty's team has managed my 3 properties for 2 years. Rent collection is always on time and maintenance issues are handled quickly.",
      rating: 5,
      properties: "3 properties"
    },
    {
      name: "Lisa Martinez",
      location: "East Liberty, Pittsburgh",
      text: "Professional service and excellent tenant screening. My vacancy rate has decreased significantly since using their services.",
      rating: 5,
      properties: "2 properties"
    },
    {
      name: "David Thompson",
      location: "Strip District, Pittsburgh",
      text: "The financial reporting is detailed and easy to understand. Highly recommend for any property owner.",
      rating: 5,
      properties: "5 properties"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary via-primary-light to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
              Professional Property Management
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
              Maximize your rental income with our comprehensive property management services. 
              We handle everything so you don't have to.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-6 py-3 text-white border-white/30 hover:bg-white/10">
                <Shield className="h-4 w-4 mr-2" />
                Full Service
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-white border-white/30 hover:bg-white/10">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Support
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-white border-white/30 hover:bg-white/10">
                <Award className="h-4 w-4 mr-2" />
                Proven Results
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-slate-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy to start managing your property professionally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={step.id} className={`text-center transition-all duration-300 hover:shadow-xl ${currentStep === step.id ? 'ring-2 ring-primary shadow-xl' : 'hover:shadow-lg'}`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold ${
                    currentStep >= step.id ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.id}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Step Content */}
          <Card className="max-w-4xl mx-auto shadow-xl border border-slate-200/50 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 sm:pb-8">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                {steps[currentStep - 1].title}
              </CardTitle>
              <p className="text-slate-600 text-sm sm:text-base">
                {steps[currentStep - 1].description}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Property Address *
                      </label>
                      <Input placeholder="123 Main Street, Pittsburgh, PA" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Property Type *
                      </label>
                      <Select>
                        <SelectTrigger className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 min-h-[44px]">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Family Home</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="multi">Multi-Family</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Number of Units
                      </label>
                      <Input placeholder="1" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Rent
                      </label>
                      <Input placeholder="$2,500" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Property Value
                      </label>
                      <Input placeholder="$400,000" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property Description
                    </label>
                      <Textarea 
                        placeholder="Tell us about your property's features, amenities, and any special requirements..."
                        className="min-h-[120px] px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300"
                      />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    Choose Your Management Plan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {managementPlans.map((plan, index) => (
                      <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary' : 'border-slate-200'}`}>
                        {plan.popular && (
                          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                            Most Popular
                          </Badge>
                        )}
                        <CardContent className="p-6">
                          <div className="text-center">
                            <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                            <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                            <div className="text-sm text-slate-600 mb-6">of monthly rent</div>
                            <p className="text-slate-600 mb-6">{plan.description}</p>
                            <ul className="space-y-2 text-sm text-slate-600 mb-6 text-left">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button 
                              onClick={() => {
                                // Handle plan selection - move to next step
                                console.log('Selected plan:', plan.name);
                                setCurrentStep(3);
                              }}
                              className={`w-full min-h-[48px] touch-target ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-slate-600 hover:bg-slate-700'}`}
                            >
                              Choose {plan.name}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    Set Your Tenant Criteria
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Minimum Credit Score
                      </label>
                      <Input placeholder="650" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Minimum Income (Monthly)
                      </label>
                      <Input placeholder="$7,500" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Pet Policy
                      </label>
                      <Select>
                        <SelectTrigger className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 min-h-[44px]">
                          <SelectValue placeholder="Select pet policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-pets">No Pets</SelectItem>
                          <SelectItem value="cats-only">Cats Only</SelectItem>
                          <SelectItem value="small-dogs">Small Dogs Only</SelectItem>
                          <SelectItem value="all-pets">All Pets Welcome</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Smoking Policy
                      </label>
                      <Select>
                        <SelectTrigger className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300 min-h-[44px]">
                          <SelectValue placeholder="Select smoking policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-smoking">No Smoking</SelectItem>
                          <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                          <SelectItem value="allowed">Smoking Allowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Requirements
                    </label>
                      <Textarea 
                        placeholder="Any specific tenant requirements or preferences..."
                        className="min-h-[100px] px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300"
                      />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    Complete Your Setup
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Owner Name *
                      </label>
                      <Input placeholder="John Doe" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <Input placeholder="+1-412-977-7090" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <Input placeholder="john@example.com" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Start Date
                      </label>
                      <Input type="date" className="h-11 px-4 py-3 text-sm border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Notes
                    </label>
                    <Textarea 
                      placeholder="Any specific instructions or questions..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => {
                    if (currentStep === 4) {
                      // Handle form submission
                      alert('Thank you! Your property management application has been submitted. We will contact you within 24 hours.');
                      // Optionally reset form or navigate
                      setCurrentStep(1);
                    } else {
                      setCurrentStep(Math.min(4, currentStep + 1));
                    }
                  }}
                  disabled={false}
                  className="min-h-[48px] touch-target"
                >
                  {currentStep === 4 ? 'Submit Application' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Comprehensive Management Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We handle every aspect of property management so you can focus on what matters most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm text-slate-600 text-left">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600">
              See how we've helped property owners maximize their rental income
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.location}</div>
                    <div className="text-primary font-bold text-lg">{testimonial.properties}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
            Ready to Maximize Your Rental Income?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-7 md:mb-8">
            Let us handle the complexities of property management while you enjoy the benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => {
                window.location.href = `tel:+14129777090`;
              }}
              className="bg-white text-primary hover:bg-white/90 h-12 px-8 py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] touch-target"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call +1-412-977-7090
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                window.location.href = `mailto:info@pittmetrorealty.com`;
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-primary h-14 px-10 py-3.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[56px] touch-target"
            >
              <Mail className="h-5 w-5 mr-2" />
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manage;
