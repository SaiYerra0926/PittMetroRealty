import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TechTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "YRD Data Solutions transformed our business with a cutting-edge web platform. Their expertise in React and Node.js delivered beyond our expectations. Highly recommended!",
      rating: 5,
      company: "TechStart Inc."
    },
    {
      name: "Michael Chen",
      role: "Product Manager, HealthTech",
      content: "The mobile app they developed for us is exceptional. Clean code, beautiful UI, and seamless performance. The team was professional and delivered on time.",
      rating: 5,
      company: "HealthTech Solutions"
    },
    {
      name: "Emily Rodriguez",
      role: "CTO, E-Commerce Plus",
      content: "Outstanding database architecture and optimization work. Our platform now handles 10x more traffic with improved response times. True experts in their field!",
      rating: 5,
      company: "E-Commerce Plus"
    },
    {
      name: "David Thompson",
      role: "Founder, FinanceApp",
      content: "From concept to deployment, YRD Data Solutions guided us every step. Their full-stack development skills and attention to detail are unmatched.",
      rating: 5,
      company: "FinanceApp"
    },
    {
      name: "Lisa Wang",
      role: "Director of IT, RetailCorp",
      content: "Excellent cloud migration and DevOps implementation. The team's knowledge of AWS and modern deployment practices saved us significant costs.",
      rating: 5,
      company: "RetailCorp"
    },
    {
      name: "James Anderson",
      role: "Startup Founder",
      content: "Best development partner we've worked with. They understood our vision and delivered a product that exceeded expectations. Will definitely work together again!",
      rating: 5,
      company: "Anderson Ventures"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-10 w-10 text-primary/30" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-heading font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechTestimonials;
