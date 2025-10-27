import { Users, Award, Clock, TrendingUp, Phone, Mail, MapPin, Building2, Star, CheckCircle, ArrowRight, Heart, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const stats = [
    { number: "500+", label: "Properties Sold", icon: TrendingUp, color: "from-blue-500 to-blue-600" },
    { number: "15+", label: "Years Experience", icon: Clock, color: "from-green-500 to-green-600" },
    { number: "98%", label: "Client Satisfaction", icon: Award, color: "from-yellow-500 to-yellow-600" },
    { number: "24/7", label: "Support Available", icon: Users, color: "from-purple-500 to-purple-600" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Client-First Approach",
      description: "Every decision we make is guided by what's best for our clients' success and satisfaction.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Shield,
      title: "Integrity & Trust",
      description: "We maintain the highest ethical standards and build lasting relationships through transparency.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge technology and creative solutions to deliver exceptional results.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every transaction, ensuring outstanding outcomes for our clients.",
      color: "from-green-500 to-green-600"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      experience: "15+ years",
      specialty: "Luxury Properties",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Mike Chen",
      role: "Senior Agent",
      experience: "12+ years",
      specialty: "Investment Properties",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      experience: "10+ years",
      specialty: "Commercial Real Estate",
      image: "/api/placeholder/150/150"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-responsive-xl font-bold text-primary mb-6">
            About Pitt Metro Realty
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            With over 15 years of experience in the real estate industry, Pitt Metro Realty has been 
            the trusted partner for thousands of clients in their property journey.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Badge variant="outline" className="px-6 py-3 text-sm flex items-center gap-3 bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold">Licensed & Certified</span>
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-sm flex items-center gap-3 bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-all duration-300">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="font-semibold">Award Winning Team</span>
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-sm flex items-center gap-3 bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-all duration-300">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-semibold">Insured & Bonded</span>
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <h3 className="text-3xl font-bold text-primary mb-6">
              Your Trusted Real Estate Partner
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We specialize in residential and commercial real estate, offering comprehensive services 
              from buying and selling to property management and investment advisory. Our team of 
              licensed professionals is dedicated to providing exceptional service, innovative 
              solutions, and personalized attention to every client.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe in building long-term relationships and helping you achieve your real estate 
              goals with confidence and success. Every transaction is handled with the utmost care 
              and professionalism.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-lg">(412) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-lg">info@pittmetrorealty.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg">123 Real Estate Ave, Pittsburgh, PA 15213</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                Schedule Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="btn-outline">
                View Our Team
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={stat.label} 
                  className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-primary mb-4">Our Core Values</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every relationship we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={value.title}
                  className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-primary mb-3">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>


        {/* Mission Statement */}
        <div className="text-center animate-fade-in-up">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-primary mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              "To provide exceptional real estate services that exceed our clients' expectations, 
              while building lasting relationships based on trust, integrity, and professional excellence. 
              We are committed to helping our clients achieve their property goals with innovative solutions 
              and personalized service."
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Licensed • Insured • Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;