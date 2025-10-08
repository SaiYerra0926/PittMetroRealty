import { Code2, Smartphone, Database, Cloud, Layers, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import webDevImage from "@/assets/web-development.jpg";
import mobileAppImage from "@/assets/mobile-apps.jpg";
import databaseImage from "@/assets/database-dev.jpg";

const TechServices = () => {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom web applications built with React, Next.js, and modern frameworks. We create responsive, fast, and SEO-optimized websites.",
      features: ["Custom Web Apps", "E-commerce Solutions", "Progressive Web Apps", "CMS Development"],
      image: webDevImage,
      gradient: "from-primary to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Application Development",
      description: "Native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and native technologies.",
      features: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Maintenance"],
      image: mobileAppImage,
      gradient: "from-secondary to-purple-600"
    },
    {
      icon: Database,
      title: "Database & Data Structures",
      description: "Design and implementation of scalable database architectures, data modeling, and optimization for high-performance applications.",
      features: ["Database Design", "Data Modeling", "Performance Optimization", "Cloud Databases"],
      image: databaseImage,
      gradient: "from-accent to-teal-600"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Deploy and manage applications on AWS, Azure, and Google Cloud with automated CI/CD pipelines and scalable infrastructure.",
      features: ["Cloud Migration", "DevOps Setup", "Serverless Architecture", "Cloud Optimization"],
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Layers,
      title: "API Development & Integration",
      description: "RESTful and GraphQL APIs, third-party integrations, and microservices architecture for seamless data flow.",
      features: ["REST APIs", "GraphQL", "Microservices", "API Security"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization, code refactoring, and performance monitoring to ensure your applications run at peak efficiency.",
      features: ["Code Optimization", "Load Time Reduction", "Caching Strategies", "Performance Monitoring"],
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive technology solutions tailored to your business needs. From concept to deployment, 
            we deliver excellence at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden">
              {service.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
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
  );
};

export default TechServices;
