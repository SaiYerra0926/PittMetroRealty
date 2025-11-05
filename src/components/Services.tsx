import { Home, TrendingUp, Shield, Users, Calculator, MapPin, ArrowRight, Building2, FileText, Phone, Clock, CheckCircle, Zap } from "lucide-react";
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

  return (
    <section id="services" className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 sm:mb-3 md:mb-4 px-2">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed px-3">
            Comprehensive real estate services tailored to meet your unique needs and exceed your expectations. 
            Our expert team delivers exceptional results through innovative solutions and personalized service.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.title} 
                  className={`service-card group animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    {/* Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${service.color} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-2 sm:mb-3 text-center group-hover:text-gray-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-center">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-2 sm:space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 sm:gap-3 text-muted-foreground group-hover:text-gray-600 transition-colors duration-300">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{feature}</span>
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
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="text-center mb-6 sm:mb-8 px-3">
            <Badge variant="outline" className="mb-2 sm:mb-3 text-xs sm:text-sm">
              <Shield className="h-3 w-3 mr-1 flex-shrink-0" />
              Property Owner Services
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 sm:mb-3">
              Owner Portal Access
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Property owners can access our secure portal to manage listings, upload photos, and track their properties.
            </p>
          </div>
          
          <div className="max-w-md mx-auto px-3 sm:px-4">
            <OwnerAccess />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;