import { TrendingUp, Clock, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatisticsCards = () => {
  const stats = [
    {
      number: "500+",
      label: "Properties Sold",
      icon: TrendingUp,
      description: "Successfully closed transactions",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: Clock,
      description: "Industry expertise and knowledge",
      color: "from-green-500 to-green-600"
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: Award,
      description: "Happy and satisfied customers",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: Users,
      description: "Round-the-clock assistance",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card 
            key={stat.label}
            className="group relative overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 bg-white"
          >
            {/* Content */}
            <CardContent className="p-4 text-center">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${stat.color} text-white mb-3 group-hover:scale-105 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Number */}
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300`}>
                {stat.number}
              </div>
              
              {/* Label */}
              <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors duration-300 leading-tight">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatisticsCards;
