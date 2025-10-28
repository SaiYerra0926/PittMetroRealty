import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import Logo from "@/components/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { 
      label: "Home", 
      href: "#home"
    },
    { 
      label: "Properties", 
      href: "#properties"
    },
    { 
      label: "Services", 
      href: "#services"
    },
    { 
      label: "About", 
      href: "#about"
    },
    { 
      label: "Contact", 
      href: "#contact"
    },
  ];

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => 
        document.querySelector(item.href)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].href.replace('#', ''));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-100 backdrop-blur-md shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 font-medium text-sm transition-all duration-300 hover:scale-105 group ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-slate-800 hover:text-primary'
                  }`}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-in-scale" />
                  )}
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700 hover:text-primary transition-all duration-300 cursor-pointer hover:scale-105 group">
              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Phone className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm font-medium">+1-412-977-7090</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 hover:text-primary transition-all duration-300 cursor-pointer hover:scale-105 group">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300">
                <Mail className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm font-medium">aggarwal_a@hotmail.com</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 group-hover:text-primary transition-all duration-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 group-hover:text-primary transition-all duration-300" />
              )}
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-200 bg-slate-100 backdrop-blur-md animate-slide-in-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`py-3 px-4 text-left font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
                      isActive 
                        ? 'text-primary bg-primary/10' 
                        : 'text-slate-800 hover:text-primary hover:bg-slate-100'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 mt-2 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-slate-700 hover:text-primary transition-all duration-300 py-2 px-4 hover:scale-105 group">
                  <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Phone className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium">+1-412-977-7090</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 hover:text-primary transition-all duration-300 py-2 px-4 hover:scale-105 group">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300">
                    <Mail className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">aggarwal_a@hotmail.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;