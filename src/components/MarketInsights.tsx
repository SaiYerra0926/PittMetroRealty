import { TrendingUp, TrendingDown, BarChart3, Home, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MarketInsights = () => {
  const marketStats = [
    {
      title: "Average Home Price",
      value: "$785,000",
      change: "+12.5%",
      trend: "up",
      period: "vs last year"
    },
    {
      title: "Days on Market",
      value: "18 days",
      change: "-25%",
      trend: "down",
      period: "vs last year"
    },
    {
      title: "Homes Sold",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      period: "this month"
    },
    {
      title: "Price per Sq Ft",
      value: "$342",
      change: "+15.7%",
      trend: "up",
      period: "vs last year"
    }
  ];

  const neighborhoods = [
    {
      name: "Downtown District",
      avgPrice: "$1,200,000",
      priceChange: "+18.5%",
      inventory: "Low",
      trend: "up"
    },
    {
      name: "Riverside Heights",
      avgPrice: "$850,000",
      priceChange: "+12.3%",
      inventory: "Medium",
      trend: "up"
    },
    {
      name: "Suburban Gardens",
      avgPrice: "$650,000",
      priceChange: "+9.8%",
      inventory: "High",
      trend: "up"
    },
    {
      name: "Historic Quarter",
      avgPrice: "$975,000",
      priceChange: "+14.2%",
      inventory: "Low",
      trend: "up"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Market Insights & Trends
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest real estate market data and neighborhood trends to make confident decisions.
          </p>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {marketStats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-full ${stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className={`h-5 w-5 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <TrendingDown className={`h-5 w-5 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    )}
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Analytics */}
        <div className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Investment Analytics & Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  ROI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-primary/10 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">12.8%</p>
                    <p className="text-sm text-muted-foreground">Average Annual ROI</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Cash Flow</span>
                    <span className="text-sm font-semibold text-green-600">+$2,400/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Appreciation</span>
                    <span className="text-sm font-semibold text-green-600">+8.5%/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cap Rate</span>
                    <span className="text-sm font-semibold">7.2%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Calculate Your ROI
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Mortgage Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-accent/10 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">$3,247</p>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Principal & Interest</span>
                    <span className="text-sm font-semibold">$2,890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Property Tax</span>
                    <span className="text-sm font-semibold">$245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Insurance</span>
                    <span className="text-sm font-semibold">$112</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Detailed Calculation
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-secondary" />
                  Property Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-secondary/10 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">247</p>
                    <p className="text-sm text-muted-foreground">Properties Tracked</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Price Alerts</span>
                    <span className="text-sm font-semibold text-blue-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Listings</span>
                    <span className="text-sm font-semibold">12 Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Saved Searches</span>
                    <span className="text-sm font-semibold">5 Active</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-white shadow-luxury">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Ready to Make Your Move?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Whether you're buying or selling, our market expertise ensures you make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Get Market Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MarketInsights;