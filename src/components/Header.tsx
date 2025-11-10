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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-100/95 backdrop-blur-md shadow-lg border-b border-slate-200 safe-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-2 sm:py-2.5 md:py-3 gap-2 sm:gap-3">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Logo size="xl" logoNoBg={true} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2.5 md:gap-3 lg:gap-4 xl:gap-5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-2 sm:px-3 md:px-4 py-2 font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 group touch-target ${
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
          <div className="hidden xl:flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2 text-slate-700 hover:text-primary transition-all duration-300 cursor-pointer hover:scale-105 group touch-target">
              <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Phone className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs xl:text-sm font-medium whitespace-nowrap">+1-412-977-7090</span>
            </div>
            <div className="hidden 2xl:flex items-center gap-2 text-slate-700 hover:text-primary transition-all duration-300 cursor-pointer hover:scale-105 group touch-target">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300">
                <Mail className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-xs xl:text-sm font-medium whitespace-nowrap">aggarwal_a@hotmail.com</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 sm:p-3 rounded-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 group touch-target min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 group-hover:text-primary transition-all duration-300" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 group-hover:text-primary transition-all duration-300" />
              )}
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden py-4 sm:py-6 border-t border-slate-200 bg-slate-100/98 backdrop-blur-md animate-slide-in-down safe-bottom max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`py-3 sm:py-4 px-4 text-base sm:text-lg text-left font-medium transition-all duration-300 rounded-lg hover:scale-105 touch-target min-h-[48px] ${
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
              <div className="pt-4 mt-2 border-t border-slate-200 space-y-2 sm:space-y-3">
                <a href="tel:+14129777090" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-all duration-300 py-3 px-4 hover:scale-105 group touch-target min-h-[48px] rounded-lg hover:bg-slate-50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">+1-412-977-7090</span>
                </a>
                <a href="mailto:aggarwal_a@hotmail.com" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-all duration-300 py-3 px-4 hover:scale-105 group touch-target min-h-[48px] rounded-lg hover:bg-slate-50">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium break-all">aggarwal_a@hotmail.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;