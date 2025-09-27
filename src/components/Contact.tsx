import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@amitagarwal.com", "sales@amitagarwal.com"],
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Business Center", "Suite 456, New York, NY 10001"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat - Sun: 10:00 AM - 5:00 PM"],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your real estate journey? Contact us today for personalized 
            service and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-8">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((item) => (
                <Card key={item.title} className="bg-gradient-card shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">
                          {item.title}
                        </h4>
                        {item.details.map((detail, index) => (
                          <p key={index} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-8">
              Send us a Message
            </h3>
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        First Name
                      </label>
                      <Input 
                        placeholder="John" 
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Doe" 
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="+1 (234) 567-8900" 
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your real estate needs..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button variant="luxury" size="xl" className="w-full">
                    Send Message
                  </Button>
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