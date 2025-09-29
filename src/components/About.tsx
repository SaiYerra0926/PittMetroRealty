import { Award, Users, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const achievements = [
    {
      icon: Users,
      title: "Client Focused",
      description: "Over 1200 satisfied clients with 98% satisfaction rate and personalized service"
    },
    {
      icon: Clock,
      title: "15+ Years Experience",
      description: "Extensive experience in residential, commercial, and luxury real estate markets"
    },
    {
      icon: TrendingUp,
      title: "Investment Specialist",
      description: "Expert in property investment strategies and portfolio management"
    },
    {
      icon: Award,
      title: "Technology Pioneer",
      description: "Leveraging cutting-edge tools and AI-powered market analysis for superior results"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              About Amit Agarwal
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 15 years of experience in the real estate industry, Amit Agarwal has established 
              himself as a trusted advisor and market leader. His commitment to excellence and client 
              satisfaction has earned him numerous awards and a reputation for delivering exceptional results.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're a first-time homebuyer, seasoned investor, or looking to sell your property, 
              Amit brings unparalleled expertise, market knowledge, and personalized service to every transaction. 
              His deep understanding of local markets and global trends ensures you make informed decisions.
            </p>
            <Button variant="luxury" size="xl">
              Get in Touch
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="bg-white p-6 rounded-xl shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center mb-4">
                  <achievement.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;