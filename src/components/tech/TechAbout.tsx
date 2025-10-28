import { Users, Award, Target, Zap } from "lucide-react";
import teamImage from "@/assets/team-work.jpg";

const TechAbout = () => {
  const stats = [
    { number: "150+", label: "Projects Delivered" },
    { number: "50+", label: "Happy Clients" },
    { number: "8+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: Users,
      title: "Client-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand your needs and deliver solutions that drive results."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain the highest standards in code quality, design, and project delivery through rigorous testing and best practices."
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Every project has clear objectives and milestones. We ensure timely delivery without compromising on quality."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We stay ahead of the curve, adopting latest technologies and methodologies to give you a competitive edge."
    }
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About YRD Data Solutions
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are a team of passionate developers, designers, and strategists dedicated to transforming 
              businesses through innovative technology solutions. With expertise across web development, 
              mobile applications, and database systems, we deliver end-to-end solutions that scale.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is to empower businesses with cutting-edge technology, exceptional user experiences, 
              and robust architectures that stand the test of time. Whether you're a startup or an enterprise, 
              we have the expertise to bring your vision to life.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                  <div className="text-4xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={teamImage} 
              alt="Our Team"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-8 bg-card border-2 border-border rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechAbout;
