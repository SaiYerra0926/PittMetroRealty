import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import portfolioImage from "@/assets/portfolio-showcase.jpg";

const TechPortfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fitness Tracking App",
      category: "Mobile Application",
      description: "Cross-platform mobile app for workout tracking, nutrition planning, and progress analytics.",
      tech: ["React Native", "Firebase", "Redux", "Chart.js"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Healthcare Management System",
      category: "Enterprise Solution",
      description: "Comprehensive patient management system with appointment scheduling, medical records, and billing.",
      tech: ["Next.js", "MongoDB", "AWS", "TypeScript"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Real-time Analytics Dashboard",
      category: "Data Visualization",
      description: "Interactive dashboard for business intelligence with real-time data processing and visualization.",
      tech: ["Vue.js", "D3.js", "Python", "Redis"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Social Media Platform",
      category: "Web & Mobile",
      description: "Modern social networking platform with live messaging, media sharing, and social features.",
      tech: ["React", "GraphQL", "MongoDB", "Socket.io"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Supply Chain Management",
      category: "Enterprise Software",
      description: "End-to-end supply chain solution with inventory tracking, logistics, and vendor management.",
      tech: ["Angular", "Java", "MySQL", "Docker"],
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Portfolio
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our successful projects across various industries. Each solution is crafted with 
            precision, innovation, and a focus on delivering exceptional results.
          </p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={portfolioImage} 
            alt="Portfolio Showcase"
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50">
              <CardContent className="p-6">
                <div className={`h-2 w-20 bg-gradient-to-r ${project.gradient} rounded-full mb-4`}></div>
                <div className="text-sm text-primary font-semibold mb-2">{project.category}</div>
                <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechPortfolio;
