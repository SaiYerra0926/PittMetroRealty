import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const TechHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              YRD Data Solutions
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-foreground hover:text-primary transition-colors font-medium">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("process")} className="text-foreground hover:text-primary transition-colors font-medium">
              Process
            </button>
            <button onClick={() => scrollToSection("technologies")} className="text-foreground hover:text-primary transition-colors font-medium">
              Technologies
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="text-foreground hover:text-primary transition-colors font-medium">
              Testimonials
            </button>
            <Button onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Get Started
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-border">
            <button onClick={() => scrollToSection("home")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("process")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium">
              Process
            </button>
            <button onClick={() => scrollToSection("technologies")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium">
              Technologies
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium">
              Testimonials
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full bg-gradient-to-r from-primary to-secondary">
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default TechHeader;
