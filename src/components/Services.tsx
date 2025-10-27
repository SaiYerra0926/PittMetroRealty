import { Home, TrendingUp, Shield, Users, Calculator, MapPin, ArrowRight, Building2, FileText, Phone, Clock, Award, CheckCircle, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OwnerAccess from "./OwnerAccess";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Expert guidance in buying and selling residential and commercial properties with maximum value realization.",
      features: ["Market Analysis", "Negotiation", "Legal Support", "Closing Assistance"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Strategic real estate investment advice to build and optimize your property portfolio for long-term growth.",
      features: ["Portfolio Analysis", "ROI Optimization", "Market Trends", "Risk Assessment"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "Property Management",
      description: "Comprehensive property management services ensuring your investments are well-maintained and profitable.",
      features: ["Tenant Screening", "Maintenance", "Rent Collection", "Financial Reporting"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      icon: Users,
      title: "Client Relations",
      description: "Personalized service and ongoing support throughout your real estate journey and beyond.",
      features: ["24/7 Support", "Personal Agent", "Follow-up Service", "Referral Program"],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      icon: Calculator,
      title: "Market Analysis",
      description: "In-depth market research and valuation services to help you make informed property decisions.",
      features: ["Property Valuation", "Market Reports", "Comparable Sales", "Trend Analysis"],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      icon: MapPin,
      title: "Location Scouting",
      description: "Expert neighborhood analysis and location scouting to find properties that match your lifestyle and goals.",
      features: ["Neighborhood Research", "School Districts", "Amenities Analysis", "Future Development"],
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600"
    }
  ];

  const stats = [
    { icon: Building2, label: "Properties Managed", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "1,200+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Star, label: "Client Rating", value: "4.9/5" }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-responsive-xl font-bold text-primary mb-6">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive real estate services tailored to meet your unique needs and exceed your expectations. 
            Our expert team delivers exceptional results through innovative solutions and personalized service.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center animate-fade-in-up bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:scale-105 group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all duration-300 group-hover:animate-bounce-subtle">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.title} 
                  className={`service-card group animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-primary mb-4 text-center group-hover:text-gray-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-muted-foreground group-hover:text-gray-600 transition-colors duration-300">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Property Owner Access Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sm">
              <Shield className="h-3 w-3 mr-1" />
              Property Owner Services
            </Badge>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Owner Portal Access
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Property owners can access our secure portal to manage listings, upload photos, and track their properties.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <OwnerAccess />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;