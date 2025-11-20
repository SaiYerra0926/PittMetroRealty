import { Users, Award, Clock, TrendingUp, Phone, Mail, MapPin, Star, CheckCircle, ArrowRight, Heart, Shield, Zap } from "lucide-react";
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
    <section id="about" className="py-6 sm:py-8 md:py-10 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-3 md:mb-4 px-2">
            About Pitt Metro Realty
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4">
            With over 15 years of experience in the real estate industry, Pitt Metro Realty has been 
            the trusted partner for thousands of clients in their property journey.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-6 px-2">
            <Badge variant="outline" className="px-4 py-2 text-xs sm:text-sm flex items-center gap-2 bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-5 h-5 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Award className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-semibold">Licensed & Certified</span>
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-xs sm:text-sm flex items-center gap-2 bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-5 h-5 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-all duration-300">
                <Star className="w-3.5 h-3.5 text-yellow-600" />
              </div>
              <span className="font-semibold">Award Winning Team</span>
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-xs sm:text-sm flex items-center gap-2 bg-white/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group">
              <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-all duration-300">
                <Shield className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="font-semibold">Insured & Bonded</span>
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden mb-6 sm:mb-8 md:mb-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            {/* Left Column - Biography */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 animate-slide-in-left flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 md:mb-5 tracking-wide">
                MEET YOUR AGENT
              </h3>
              <div className="prose prose-sm sm:prose-base max-w-none text-slate-700">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-5">
                  With a stellar track record of over $125 million in sales from 2020 to 2024, 
                  I bring over two decades of experience and hundreds of closed transactions to every client. 
                  My approach is built on positivity, professionalism, and an unparalleled dedication to 
                  delivering exceptional service and results.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  My tenacious work ethic drives me to go above and beyond for my clients, persisting 
                  where others might falter. I firmly believe in never taking no for an answer — where 
                  there is a will, there is a way, and I am relentless in my pursuit of finding it.
                </p>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="bg-slate-50 p-4 sm:p-5 md:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-300 animate-slide-in-right">
              <div className="flex flex-col items-center justify-center h-full">
                {/* Name */}
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2 sm:mb-3">
                  Amit Aggarwal
                </h4>

                {/* Title */}
                <p className="text-xs sm:text-sm font-medium text-slate-700 text-center mb-5 sm:mb-6 md:mb-7 px-2">
                  Real Estate Expert | Licensed Agent
                </p>

                {/* Contact Information */}
                <div className="w-full space-y-2 sm:space-y-2.5 mb-3 sm:mb-4 md:mb-5">
                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mb-0.5 font-medium">Phone</p>
                    <a href="tel:+14129777090" className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-primary transition-colors touch-target block">+1-412-977-7090</a>
                  </div>

                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mb-0.5 font-medium">Email</p>
                    <a href="mailto:aggarwal_a@hotmail.com" className="text-xs sm:text-sm font-semibold text-slate-900 break-all hover:text-primary transition-colors touch-target block">aggarwal_a@hotmail.com</a>
                  </div>

                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mb-0.5 font-medium">Address</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">201 Sonni Ln</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">McKees Rocks, PA 15136</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mb-0.5 font-medium">Website</p>
                    <a href="https://pittmetrorealty.com" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-primary transition-colors break-all touch-target block">
                      https://pittmetrorealty.com
                    </a>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-2 sm:gap-2.5 pt-4 sm:pt-5 border-t border-slate-300 w-full justify-center">
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group touch-target">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                      <span className="text-white text-xs sm:text-sm font-bold">f</span>
                    </div>
                  </a>
                  
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group touch-target">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                      <span className="text-white text-xs sm:text-sm font-bold">in</span>
                    </div>
                  </a>
                  
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group touch-target">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                      <span className="text-white text-xs sm:text-sm">▶</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 animate-fade-in-up px-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">Our Core Values</h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              The principles that guide everything we do and every relationship we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 items-stretch">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={value.title}
                  className="text-center p-4 sm:p-5 md:p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${value.color} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}>
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-2 sm:mb-3">{value.title}</h4>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>


        {/* Mission Statement */}
        
            
            
          </div>
        
    </section>
  );
};

export default About;