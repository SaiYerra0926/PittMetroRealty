import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ScheduleConsultation = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const consultationTypes = [
    { value: "property-valuation", label: "Property Valuation" },
    { value: "buying-consultation", label: "Buying Consultation" },
    { value: "selling-consultation", label: "Selling Consultation" },
    { value: "investment-advice", label: "Investment Advice" },
    { value: "market-analysis", label: "Market Analysis" },
    { value: "general-inquiry", label: "General Inquiry" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-luxury border-green-200">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  Consultation Scheduled Successfully!
                </h2>
                <p className="text-lg text-green-700 mb-6">
                  Thank you for scheduling your consultation. We'll send you a confirmation email with all the details.
                </p>
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-green-800 mb-3">What happens next?</h3>
                  <ul className="text-left space-y-2 text-green-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      You'll receive a confirmation email within 5 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Our team will prepare personalized materials for your consultation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Pitt Metro Realty will call you at the scheduled time
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline" 
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  Schedule Another Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Schedule Your Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Book a personalized consultation with Pitt Metro Realty. Get expert advice tailored to your real estate needs.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">Free Consultation</Badge>
            <Badge variant="outline" className="px-4 py-2">Expert Advice</Badge>
            <Badge variant="outline" className="px-4 py-2">Personalized Service</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Consultation Form */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Book Your Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (234) 567-8900"
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="consultationType">Consultation Type *</Label>
                  <Select value={consultationType} onValueChange={setConsultationType} required>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl mt-1">
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date *</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime} required>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your real estate goals and any specific questions you have..."
                    className="min-h-[100px] border-2 border-gray-200 focus:border-primary rounded-xl mt-1"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Consultation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Consultation Benefits */}
          <div className="space-y-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
                    <p className="text-muted-foreground">
                      Choose a time that works best for you. We offer consultations during business hours and some evenings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Personalized Service</h3>
                    <p className="text-muted-foreground">
                      Get one-on-one attention from Pitt Metro Realty with customized advice based on your specific needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                    <p className="text-muted-foreground">
                      Benefit from 15+ years of local market knowledge and established relationships in the area.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-primary to-primary-light text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Why Schedule a Consultation?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Get expert market insights and property valuations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Receive personalized investment strategies
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Access exclusive off-market properties
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Build a long-term real estate partnership
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleConsultation;
