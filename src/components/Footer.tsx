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
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 items-start">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-1 sm:mb-1.5">
              <Logo size="xl" theme="dark" />
            </div>
            <p className="text-white/55 mb-1.5 sm:mb-2 leading-snug text-xs sm:text-sm max-w-sm">
              Your trusted partner in real estate excellence. Delivering exceptional service 
              and results for over 15 years in Pittsburgh and surrounding areas.
            </p>
            <div className="flex gap-1 sm:gap-1.5 flex-wrap mt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-white/10 hover:bg-primary rounded-md flex items-center justify-center hover:text-white transition-all duration-150 group touch-target border border-white/10 hover:border-primary/50 shadow-sm hover:shadow-md hover:scale-105"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-bold mb-1 sm:mb-1.5 text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-0 sm:space-y-0.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-primary transition-all text-xs sm:text-sm hover:translate-x-0.5 transform duration-150 inline-flex items-center gap-1 touch-target py-0.5 group"
                  >
                    <span className="w-0.5 h-0.5 bg-primary/0 group-hover:bg-primary rounded-full transition-all duration-150"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-bold mb-1 sm:mb-1.5 text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-0 sm:space-y-0.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/55 hover:text-primary transition-colors text-xs sm:text-sm inline-flex items-center gap-1 cursor-pointer group">
                    <span className="w-0.5 h-0.5 bg-primary/0 group-hover:bg-primary rounded-full transition-all duration-150"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-bold mb-1 sm:mb-1.5 text-white uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-0.5 sm:space-y-1">
              <a href="tel:+14129777090" className="flex items-start gap-1.5 sm:gap-1.5 hover:translate-x-0.5 transition-all touch-target group">
                <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/10 group-hover:bg-primary/20 border border-white/20 group-hover:border-primary/50 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-150 shadow-sm group-hover:shadow">
                  <Phone className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 text-white group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-xs sm:text-sm group-hover:text-primary transition-colors leading-tight">+1-412-977-7090</p>
                  <p className="text-white/45 text-[9px] sm:text-[10px] leading-tight">Main Office</p>
                </div>
              </a>
              <a href="mailto:aggarwal_a@hotmail.com" className="flex items-start gap-1.5 sm:gap-1.5 hover:translate-x-0.5 transition-all touch-target group">
                <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/10 group-hover:bg-primary/20 border border-white/20 group-hover:border-primary/50 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-150 shadow-sm group-hover:shadow">
                  <Mail className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 text-white group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-xs sm:text-sm break-all group-hover:text-primary transition-colors leading-tight">aggarwal_a@hotmail.com</p>
                  <p className="text-white/45 text-[9px] sm:text-[10px] leading-tight">General Inquiries</p>
                </div>
              </a>
              <div className="flex items-start gap-1.5 sm:gap-1.5">
                <div className="w-5 h-5 sm:w-5 sm:h-5 bg-white/10 border border-white/20 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="h-2.5 w-2.5 sm:h-2.5 sm:w-2.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-xs sm:text-sm leading-tight">201 Sonni Ln</p>
                  <p className="text-white font-medium text-xs sm:text-sm leading-tight">McKees Rocks, PA 15136</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-2 sm:mt-2.5 pt-2 sm:pt-2.5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-1.5">
            <p className="text-white/35 text-[9px] sm:text-[10px] text-center md:text-left">
              © 2025 Pitt Metro Realty. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px]">
              <a href="#" className="text-white/35 hover:text-primary transition-colors touch-target py-0.5 px-0.5 hover:underline">
                Privacy Policy
              </a>
              <span className="text-white/15">•</span>
              <a href="#" className="text-white/35 hover:text-primary transition-colors touch-target py-0.5 px-0.5 hover:underline">
                Terms of Service
              </a>
              <span className="text-white/15">•</span>
              <a href="#" className="text-white/35 hover:text-primary transition-colors touch-target py-0.5 px-0.5 hover:underline">
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