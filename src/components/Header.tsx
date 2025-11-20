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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Main navigation */}
        <nav className="flex items-center justify-between h-14 md:h-16 gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 h-full">
            <div className="header-logo-container">
              <Logo size="lg" logoNoBg={true} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 md:gap-2 lg:gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3 py-1.5 font-medium text-sm text-slate-700 transition-colors duration-200 group touch-target ${
                    isActive 
                      ? 'text-primary font-semibold' 
                      : 'hover:text-primary'
                  }`}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/30 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </button>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="hidden xl:flex items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors duration-200 cursor-pointer group touch-target">
              <div className="w-4 h-4 flex items-center justify-center">
                <Phone className="h-3.5 w-3.5 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium whitespace-nowrap">+1-412-977-7090</span>
            </div>
            <div className="hidden 2xl:flex items-center gap-2 text-slate-600 hover:text-primary transition-colors duration-200 cursor-pointer group touch-target">
              <div className="w-4 h-4 flex items-center justify-center">
                <Mail className="h-3.5 w-3.5 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium whitespace-nowrap">aggarwal_a@hotmail.com</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-md hover:bg-slate-100 transition-colors duration-200 group touch-target min-w-[40px] min-h-[40px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-slate-700 group-hover:text-primary transition-colors" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700 group-hover:text-primary transition-colors" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden py-2 border-t border-slate-200 bg-white/98 backdrop-blur-md animate-slide-in-down safe-bottom max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`py-2.5 px-4 text-sm text-left font-medium transition-colors duration-200 rounded-md touch-target min-h-[44px] ${
                      isActive 
                        ? 'text-primary bg-primary/5 font-semibold' 
                        : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              {/* Mobile Contact Info */}
              <div className="pt-3 mt-2 border-t border-slate-200 space-y-2">
                <a href="tel:+14129777090" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors duration-200 py-2.5 px-4 group touch-target min-h-[44px] rounded-md hover:bg-slate-50">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium">+1-412-977-7090</span>
                </a>
                <a href="mailto:aggarwal_a@hotmail.com" className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors duration-200 py-2.5 px-4 group touch-target min-h-[44px] rounded-md hover:bg-slate-50">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium break-all">aggarwal_a@hotmail.com</span>
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