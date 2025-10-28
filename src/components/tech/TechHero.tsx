import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Smartphone, Database } from "lucide-react";
import heroImage from "@/assets/tech-hero.jpg";

const TechHero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Technology Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Transforming Ideas into Digital Reality</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Build Your Digital Future with YRD Data Solutions
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            We deliver cutting-edge web applications, mobile solutions, and robust database architectures 
            that drive business growth and innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 hover:opacity-90 transition-opacity"
              onClick={() => scrollToSection("contact")}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2"
              onClick={() => scrollToSection("portfolio")}
            >
              View Our Work
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Web Development</h3>
              <p className="text-muted-foreground text-sm">Modern, responsive websites built with latest technologies</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Mobile Applications</h3>
              <p className="text-muted-foreground text-sm">Native and cross-platform apps for iOS and Android</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-teal-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Database className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Database Solutions</h3>
              <p className="text-muted-foreground text-sm">Scalable data structures and optimized database systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechHero;
