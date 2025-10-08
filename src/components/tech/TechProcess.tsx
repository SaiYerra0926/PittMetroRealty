import { Lightbulb, PenTool, Code, Rocket, CheckCircle, HeadphonesIcon } from "lucide-react";

const TechProcess = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Planning",
      description: "We analyze your requirements, define project scope, and create a detailed roadmap.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: PenTool,
      title: "Design & Prototype",
      description: "Our designers create intuitive UI/UX designs and interactive prototypes for your approval.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Code,
      title: "Development",
      description: "Agile development with regular updates, using best practices and modern technologies.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: CheckCircle,
      title: "Testing & QA",
      description: "Comprehensive testing across devices and platforms to ensure flawless functionality.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Rocket,
      title: "Deployment",
      description: "Smooth launch with CI/CD pipelines, monitoring, and performance optimization.",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: HeadphonesIcon,
      title: "Support & Maintenance",
      description: "Ongoing support, updates, and enhancements to keep your solution running perfectly.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    }
  ];

  return (
    <section id="process" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground">
            A proven methodology that ensures successful project delivery from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
              <div className="relative bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 ${step.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`h-7 w-7 ${step.color}`} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechProcess;
