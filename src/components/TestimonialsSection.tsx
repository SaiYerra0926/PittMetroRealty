import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah & Michael Johnson",
      location: "Downtown District",
      rating: 5,
      text: "Amit made our home buying experience seamless and stress-free. His deep knowledge of the local market helped us find our dream home within our budget. We couldn't be happier with our decision to work with him.",
      property: "Purchased $1.2M Single Family Home",
      image: "/placeholder.svg"
    },
    {
      name: "Robert Chen",
      location: "Riverside Heights",
      rating: 5,
      text: "Selling our family home was emotional, but Amit handled everything with such professionalism and care. He got us above asking price and made sure we understood every step of the process.",
      property: "Sold $875K Townhouse",
      image: "/placeholder.svg"
    },
    {
      name: "Jennifer Martinez",
      location: "Historic Quarter",
      rating: 5,
      text: "As a first-time homebuyer, I was overwhelmed by the process. Amit patiently guided me through everything and negotiated an amazing deal. I'm now loving my new condo!",
      property: "Purchased $650K Condominium",
      image: "/placeholder.svg"
    },
    {
      name: "David & Lisa Thompson",
      location: "Suburban Gardens",
      rating: 5,
      text: "We've bought and sold homes before, but working with Amit was by far the best experience. His market insights and negotiation skills saved us thousands. Highly recommended!",
      property: "Sold $950K Villa",
      image: "/placeholder.svg"
    },
    {
      name: "Mark Rodriguez",
      location: "Business District",
      rating: 5,
      text: "Amit helped me acquire a commercial property for my expanding business. His understanding of commercial real estate and his network of contacts made the deal possible.",
      property: "Purchased $2.1M Commercial Space",
      image: "/placeholder.svg"
    },
    {
      name: "Amanda Foster",
      location: "Lakeside Community",
      rating: 5,
      text: "The attention to detail and personal service Amit provides is exceptional. He was always available to answer our questions and went above and beyond our expectations.",
      property: "Purchased $780K Lakefront Home",
      image: "/placeholder.svg"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience working with Amit Agarwal Real Estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                  <p className="text-muted-foreground italic leading-relaxed pl-6">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-accent font-medium mt-1">{testimonial.property}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">$250M+</div>
            <div className="text-muted-foreground">In Sales Volume</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground">Industry Awards</div>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block shadow-luxury">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <img src="/placeholder.svg" alt="Google" className="h-6 w-6" />
                  <span className="font-semibold">Google Reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(5)}
                  <span className="ml-2 text-sm text-muted-foreground">4.9/5 (127 reviews)</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                See what our clients are saying on Google Reviews
              </p>
              <a 
                href="#" 
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                Read All Reviews →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;