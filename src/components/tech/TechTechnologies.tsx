import { Code2, Database, Cloud, Smartphone, Layers, Zap } from "lucide-react";

const TechTechnologies = () => {
  const techStack = [
    {
      category: "Frontend",
      icon: Code2,
      technologies: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Mobile",
      icon: Smartphone,
      technologies: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "Ionic"],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Backend",
      icon: Layers,
      technologies: ["Node.js", "Python", "Java", "PHP", "Go", "Ruby on Rails"],
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Database",
      icon: Database,
      technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "Firebase"],
      color: "from-orange-500 to-red-500"
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      category: "Tools & Others",
      icon: Zap,
      technologies: ["Git", "GraphQL", "REST APIs", "WebSockets", "Microservices", "Serverless"],
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="technologies" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Technologies We Use
          </h2>
          <p className="text-lg text-muted-foreground">
            We leverage the latest and most powerful technologies to build scalable, 
            secure, and high-performance solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((stack, index) => (
            <div 
              key={index} 
              className="bg-card border-2 border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stack.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stack.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-foreground">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.technologies.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechTechnologies;
