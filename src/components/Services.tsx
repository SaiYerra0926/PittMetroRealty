import { Home, TrendingUp, Shield, Users, Calculator, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Expert guidance in buying and selling residential and commercial properties with maximum value realization.",
      features: ["Market Analysis", "Negotiation", "Legal Support", "Closing Assistance"]
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Strategic real estate investment advice to build and optimize your property portfolio for long-term growth.",
      features: ["Portfolio Analysis", "ROI Optimization", "Market Trends", "Risk Assessment"]
    },
    {
      icon: Shield,
      title: "Property Management",
      description: "Comprehensive property management services ensuring your investments are well-maintained and profitable.",
      features: ["Tenant Screening", "Maintenance", "Rent Collection", "Financial Reporting"]
    },
    {
      icon: Users,
      title: "Client Relations",
      description: "Personalized service and ongoing support throughout your real estate journey and beyond.",
      features: ["24/7 Support", "Personal Agent", "Follow-up Service", "Referral Program"]
    },
    {
      icon: Calculator,
      title: "Market Analysis",
      description: "In-depth market research and valuation services to help you make informed property decisions.",
      features: ["Property Valuation", "Market Reports", "Comparable Sales", "Trend Analysis"]
    },
    {
      icon: MapPin,
      title: "Location Scouting",
      description: "Expert neighborhood analysis and location scouting to find properties that match your lifestyle and goals.",
      features: ["Neighborhood Research", "School Districts", "Amenities Analysis", "Future Development"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Comprehensive real estate services tailored to meet your unique needs and exceed your expectations. 
            From buying and selling to investment advisory and property management.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">15+ Years Experience</Badge>
            <Badge variant="outline" className="px-4 py-2">500+ Properties Sold</Badge>
            <Badge variant="outline" className="px-4 py-2">Award Winning</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={service.title} className="group bg-white shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;