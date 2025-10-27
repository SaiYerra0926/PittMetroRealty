import { useState } from "react";
import { Menu, X, Phone, Mail, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Sell", href: "#sell" },
    { label: "Buy", href: "#buy" },
    { label: "Rent", href: "#rent" },
    { label: "Manage", href: "#manage" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top utility bar */}
        <div className="hidden lg:flex items-center justify-between py-3 text-sm text-slate-300 border-b border-slate-600">
          <div className="flex items-center gap-8">
            <span className="font-medium hover:text-yellow-400 transition-colors cursor-pointer">Residential</span>
            <span className="font-medium hover:text-yellow-400 transition-colors cursor-pointer">Commercial</span>
            <span className="font-medium hover:text-yellow-400 transition-colors cursor-pointer">Investment</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-8900</span>
            </a>
            <a href="mailto:info@amitagarwal.com" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@amitagarwal.com</span>
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-200 hover:text-yellow-400 transition-colors font-medium text-sm flex items-center gap-1"
                >
                  {item.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white">
                <Search className="h-4 w-4" />
                Find Properties
              </Button>
              <Button variant="default" size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold">
                What's my property worth?
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-200" />
            ) : (
              <Menu className="h-6 w-6 text-slate-200" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-600 bg-slate-800">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-200 hover:text-yellow-400 transition-colors font-medium py-3 px-2 rounded-md hover:bg-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-600 space-y-2">
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2 border-slate-600 text-slate-200 hover:bg-slate-700">
                  <Search className="h-4 w-4" />
                  Find Properties
                </Button>
                <Button variant="default" size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900">
                  What's my property worth?
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;