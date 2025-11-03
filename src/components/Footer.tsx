import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Buy Properties", href: "/buy" },
    { label: "Sell Properties", href: "/sell" },
    { label: "Rent Properties", href: "/rent" },
    { label: "Property Management", href: "/manage" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "Property Sales",
    "Investment Advisory", 
    "Property Management",
    "Market Analysis",
    "Location Scouting",
    "Mortgage Assistance",
    "Property Valuation",
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-5 md:mb-6">
              <Logo size="lg" theme="dark" />
            </div>
            <p className="text-white/80 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base max-w-sm">
              Your trusted partner in real estate excellence. Delivering exceptional service 
              and results for over 15 years in Pittsburgh and surrounding areas.
            </p>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group touch-target"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-primary transition-colors text-xs sm:text-sm md:text-base hover:translate-x-1 transform duration-200 inline-block touch-target py-1 sm:py-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-white">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service} className="text-white/80 text-xs sm:text-sm md:text-base">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-white">Contact Info</h4>
            <div className="space-y-3 sm:space-y-4">
              <a href="tel:+14129777090" className="flex items-start gap-2 sm:gap-3 hover:opacity-90 transition-opacity touch-target">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">+1-412-977-7090</p>
                  <p className="text-white/70 text-xs sm:text-sm">Main Office</p>
                </div>
              </a>
              <a href="mailto:aggarwal_a@hotmail.com" className="flex items-start gap-2 sm:gap-3 hover:opacity-90 transition-opacity touch-target">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-xs sm:text-sm md:text-base break-all">aggarwal_a@hotmail.com</p>
                  <p className="text-white/70 text-xs sm:text-sm">General Inquiries</p>
                </div>
              </a>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">201 Sonni Ln</p>
                  <p className="text-white font-semibold text-sm sm:text-base">McKees Rocks, PA 15136</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-white/60 text-xs sm:text-sm md:text-base text-center md:text-left">
              © 2025 Pitt Metro Realty. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base">
              <a href="#" className="text-white/60 hover:text-primary transition-colors touch-target py-1 sm:py-2">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors touch-target py-1 sm:py-2">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors touch-target py-1 sm:py-2">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;