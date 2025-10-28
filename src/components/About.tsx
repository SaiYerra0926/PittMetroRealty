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
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left Column - Biography */}
            <div className="p-10 lg:p-12 animate-slide-in-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-wide">
                MEET YOUR AGENT
              </h3>
              <div className="prose prose-lg max-w-none text-slate-700">
                <p className="leading-relaxed mb-6">
                  With a stellar track record of over $125 million in sales from 2020 to 2024, 
                  I bring over two decades of experience and hundreds of closed transactions to every client. 
                  My approach is built on positivity, professionalism, and an unparalleled dedication to 
                  delivering exceptional service and results.
                </p>
                <p className="leading-relaxed">
                  My tenacious work ethic drives me to go above and beyond for my clients, persisting 
                  where others might falter. I firmly believe in never taking no for an answer — where 
                  there is a will, there is a way, and I am relentless in my pursuit of finding it.
                </p>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="bg-slate-50 p-10 lg:p-12 border-l border-slate-300 animate-slide-in-right">
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-slate-300 shadow-xl mb-6 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                  <img 
                    src="/amit-aggarwal-profile.jpg" 
                    alt="Amit Aggarwal - Real Estate Expert"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (!target.parentElement?.querySelector('.fallback')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'fallback w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 text-slate-700 flex items-center justify-center font-bold text-3xl';
                        placeholder.textContent = 'AA';
                        target.parentElement?.appendChild(placeholder);
                      }
                    }}
                  />
                </div>

                {/* Name */}
                <h4 className="text-xl font-bold text-slate-900 text-center mb-1.5">
                  Amit Aggarwal
                </h4>

                {/* Title */}
                <p className="text-sm font-medium text-slate-700 text-center mb-7">
                  Real Estate Expert | Licensed Agent
                </p>

                {/* Contact Information */}
                <div className="w-full space-y-4 mb-7">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Phone</p>
                    <p className="text-sm font-semibold text-slate-900">+1-412-977-7090</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Email</p>
                    <p className="text-sm font-semibold text-slate-900 break-all">aggarwal_a@hotmail.com</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Address</p>
                    <p className="text-sm font-semibold text-slate-900">201 Sonni Ln</p>
                    <p className="text-sm font-semibold text-slate-900">McKees Rocks, PA 15136</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Website</p>
                    <a href="https://pittmetrorealty.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors break-all">
                      https://pittmetrorealty.com
                    </a>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-2.5 pt-5 border-t border-slate-300 w-full justify-center">
                  {/* Facebook */}
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                  </a>
                  
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                  </a>
                  
                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110">
                      <span className="text-white text-xs">▶</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
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