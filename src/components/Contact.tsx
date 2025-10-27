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
      value: "(412) 555-0123",
      action: "Call Now",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get a detailed response",
      value: "info@pittmetrorealty.com",
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
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-8 shadow-lg">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-responsive-xl font-bold text-primary mb-6">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Ready to start your real estate journey? Contact our expert team for personalized 
            assistance and professional guidance.
          </p>
          
          {/* Quick Contact Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3 text-gray-600 bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">4.9/5 Client Rating</div>
                <div className="text-xs text-gray-500">Based on 500+ reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Free Consultation</div>
                <div className="text-xs text-gray-500">No obligation required</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Section - Contact Information */}
            <div className="animate-slide-in-left">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We're here to help you with all your real estate needs. Reach out to us through 
                  any of the following channels, and we'll get back to you promptly.
                </p>

                {/* Office Hours */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    Office Hours
                  </h4>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200">
                    {officeHours.map((schedule, index) => (
                      <div key={schedule.day} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
                        <span className="font-semibold text-gray-800">{schedule.day}</span>
                        <span className="text-gray-600 font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    Our Location
                  </h4>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200">
                    <div className="space-y-2">
                      <p className="text-gray-800 font-semibold text-lg">Pitt Metro Realty</p>
                      <p className="text-gray-600">123 Real Estate Avenue</p>
                      <p className="text-gray-600">Pittsburgh, PA 15213</p>
                      <p className="text-gray-600">United States</p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="btn-primary flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="btn-outline flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="animate-slide-in-right">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Send className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-4">
                    Send Us a Message
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-primary">First Name</label>
                      <Input 
                        placeholder="John" 
                        className="form-input h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-primary">Last Name</label>
                      <Input 
                        placeholder="Doe" 
                        className="form-input h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Email Address</label>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      className="form-input h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Phone Number</label>
                    <Input 
                      placeholder="(412) 555-0123" 
                      className="form-input h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Service Interested In</label>
                    <select className="form-input h-12 text-base">
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

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Message</label>
                    <Textarea 
                      placeholder="Tell us about your real estate needs, timeline, budget, or any specific questions you have..."
                      className="form-textarea min-h-[140px] text-base"
                    />
                  </div>


                  <Button className="w-full btn-primary h-14 text-lg font-semibold">
                    Send Message
                    <Send className="h-5 w-5 ml-2" />
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