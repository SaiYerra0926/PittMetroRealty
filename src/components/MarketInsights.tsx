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

        {/* Neighborhood Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-serif font-bold text-primary mb-8">Top Neighborhoods</h3>
            <div className="space-y-4">
              {neighborhoods.map((neighborhood, index) => (
                <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{neighborhood.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        neighborhood.inventory === 'Low' ? 'bg-red-100 text-red-700' :
                        neighborhood.inventory === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {neighborhood.inventory} Inventory
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">{neighborhood.avgPrice}</p>
                        <p className="text-sm text-muted-foreground">Average Price</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 font-semibold">{neighborhood.priceChange}</p>
                        <p className="text-sm text-muted-foreground">Price Change</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-serif font-bold text-primary mb-8">Market Forecast</h3>
            <Card className="shadow-luxury">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Next 12 Months Outlook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-primary" />
                    <span className="font-medium">Home Prices</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">+8-12%</span>
                    <p className="text-sm text-muted-foreground">Continued Growth</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <span className="font-medium">Interest Rates</span>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 font-semibold">6.5-7.2%</span>
                    <p className="text-sm text-muted-foreground">Stabilizing</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Market Activity</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">Strong</span>
                    <p className="text-sm text-muted-foreground">High Demand</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Expert Analysis</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The local real estate market remains robust with continued appreciation in home values. 
                    While interest rates have stabilized, strong employment growth and limited inventory 
                    continue to support buyer demand. This is an excellent time for both buyers and sellers 
                    to take advantage of market conditions.
                  </p>
                </div>

                <Button variant="outline" className="w-full">
                  Download Full Market Report
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