import { Mail, Phone, MapPin, Send, Clock, CheckCircle, MessageCircle, Calendar, Star, Users, Award, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our experts",
      value: "+1-412-977-7090",
      action: "Call Now",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get a detailed response",
      value: "aggarwal_a@hotmail.com",
      action: "Send Email",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us instantly",
      value: "Available 24/7",
      action: "Start Chat",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "By Appointment" }
  ];

  const whyChooseUs = [
    { icon: Award, text: "15+ years of experience" },
    { icon: Users, text: "500+ successful transactions" },
    { icon: Star, text: "98% client satisfaction rate" },
    { icon: Shield, text: "Licensed & insured professionals" },
    { icon: Zap, text: "Fast response time (&lt; 2 hours)" },
    { icon: CheckCircle, text: "Free initial consultation" }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-primary to-primary/80 rounded-xl sm:rounded-2xl mb-6 sm:mb-7 md:mb-8 shadow-lg">
            <MessageCircle className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
          </div>
          <h2 className="text-responsive-xl font-bold text-primary mb-4 sm:mb-5 md:mb-6 px-2">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-7 md:mb-8 px-3">
            Ready to start your real estate journey? Contact our expert team for personalized 
            assistance and professional guidance.
          </p>
          
          {/* Quick Contact Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-7 md:mb-8 px-2">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-600 bg-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 touch-target">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">4.9/5 Client Rating</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Based on 500+ reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-600 bg-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 touch-target">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">Free Consultation</div>
                <div className="text-[10px] sm:text-xs text-gray-500">No obligation required</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-start">
            {/* Left Section - Contact Information */}
            <div className="animate-slide-in-left">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span>Contact Information</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  We're here to help you with all your real estate needs. Reach out to us through 
                  any of the following channels, and we'll get back to you promptly.
                </p>

                {/* Office Hours */}
                <div className="mb-6 sm:mb-7 md:mb-8">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span>Office Hours</span>
                  </h4>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200">
                    {officeHours.map((schedule, index) => (
                      <div key={schedule.day} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 border-b border-gray-200 last:border-b-0 gap-1 sm:gap-0">
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">{schedule.day}</span>
                        <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6 sm:mb-7 md:mb-8">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span>Our Location</span>
                  </h4>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200">
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">Pitt Metro Realty</p>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base">123 Real Estate Avenue</p>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base">Pittsburgh, PA 15213</p>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base">United States</p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button 
                    onClick={() => {
                      window.location.href = `tel:+14129777090`;
                    }}
                    className="btn-primary flex items-center justify-center gap-2 touch-target text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 py-2.5 sm:py-3"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Call Now</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      window.location.href = `mailto:info@pittmetrorealty.com`;
                    }}
                    className="btn-outline flex items-center justify-center gap-2 touch-target text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 py-2.5 sm:py-3"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Send Email</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="animate-slide-in-right">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-6 sm:mb-7 md:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg">
                    <Send className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground px-2">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                <form className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold text-primary">First Name</label>
                      <Input 
                        placeholder="John" 
                        className="form-input h-11 sm:h-12 md:h-14 text-sm sm:text-base touch-target"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold text-primary">Last Name</label>
                      <Input 
                        placeholder="Doe" 
                        className="form-input h-11 sm:h-12 md:h-14 text-sm sm:text-base touch-target"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-primary">Email Address</label>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      className="form-input h-11 sm:h-12 md:h-14 text-sm sm:text-base touch-target"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-primary">Phone Number</label>
                    <Input 
                      placeholder="+1-412-977-7090" 
                      className="form-input h-11 sm:h-12 md:h-14 text-sm sm:text-base touch-target"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-primary">Service Interested In</label>
                    <select className="form-input h-11 sm:h-12 md:h-14 text-sm sm:text-base touch-target">
                      <option value="">Select a service</option>
                      <option value="buy">Buying a Property</option>
                      <option value="sell">Selling a Property</option>
                      <option value="rent">Renting a Property</option>
                      <option value="manage">Property Management</option>
                      <option value="invest">Investment Advisory</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-primary">Message</label>
                    <Textarea 
                      placeholder="Tell us about your real estate needs, timeline, budget, or any specific questions you have..."
                      className="form-textarea min-h-[120px] sm:min-h-[140px] md:min-h-[160px] text-sm sm:text-base touch-target"
                    />
                  </div>


                  <Button 
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle form submission
                      const form = e.currentTarget.closest('form');
                      if (form) {
                        const formData = new FormData(form as HTMLFormElement);
                        const data = Object.fromEntries(formData);
                        console.log('Contact form submitted:', data);
                        alert('Thank you! Your message has been sent. We will contact you soon.');
                        form.reset();
                      }
                    }}
                    className="w-full btn-primary h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-semibold touch-target"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;