import { Home, TrendingUp, Shield, Users, Calculator, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Expert guidance in buying and selling residential and commercial properties with maximum value realization."
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Strategic real estate investment advice to build and optimize your property portfolio for long-term growth."
    },
    {
      icon: Shield,
      title: "Property Management",
      description: "Comprehensive property management services ensuring your investments are well-maintained and profitable."
    },
    {
      icon: Users,
      title: "Client Relations",
      description: "Personalized service and ongoing support throughout your real estate journey and beyond."
    },
    {
      icon: Calculator,
      title: "Market Analysis",
      description: "In-depth market research and valuation services to help you make informed property decisions."
    },
    {
      icon: MapPin,
      title: "Location Scouting",
      description: "Expert neighborhood analysis and location scouting to find properties that match your lifestyle and goals."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive real estate services tailored to meet your unique needs and exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="group bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;