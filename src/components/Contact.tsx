import { Phone, Mail, MapPin, Clock, Send, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@amitagarwal.com", "sales@amitagarwal.com"],
      action: "Email Us"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Business Center", "Suite 456, New York, NY 10001"],
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat - Sun: 10:00 AM - 5:00 PM"],
      action: "Schedule Meeting"
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Ready to start your real estate journey? Contact us today for personalized 
            service and expert guidance. We're here to help you every step of the way.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">24/7 Support</Badge>
            <Badge variant="outline" className="px-4 py-2">Free Consultation</Badge>
            <Badge variant="outline" className="px-4 py-2">Quick Response</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-8">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((item) => (
                <Card key={item.title} className="bg-white shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-primary mb-2">
                          {item.title}
                        </h4>
                        {item.details.map((detail, index) => (
                          <p key={index} className="text-muted-foreground text-sm mb-1">
                            {detail}
                          </p>
                        ))}
                        <Button variant="outline" size="sm" className="mt-3 text-primary hover:bg-primary hover:text-white">
                          {item.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-8">
              Send us a Message
            </h3>
            <Card className="bg-white shadow-card border border-gray-100">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        First Name *
                      </label>
                      <Input 
                        placeholder="John" 
                        className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Last Name *
                      </label>
                      <Input 
                        placeholder="Doe" 
                        className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="+1 (234) 567-8900" 
                      className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your real estate needs..."
                      className="min-h-[120px] border-2 border-gray-200 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="default" size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;