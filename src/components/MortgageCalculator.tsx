import { useState } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(750000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const loanAmount = homePrice - (homePrice * downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const propertyTax = homePrice * 0.012 / 12; // 1.2% annually
  const insurance = homePrice * 0.0035 / 12; // 0.35% annually
  const totalMonthly = monthlyPayment + propertyTax + insurance;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 animate-fade-in-up">
            Mortgage Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Calculate your monthly payments and explore different scenarios to find the perfect loan for your needs. 
            Get accurate estimates with our professional mortgage calculator.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up-delay">
            <Badge variant="outline" className="px-4 py-2">Real-time Calculations</Badge>
            <Badge variant="outline" className="px-4 py-2">Detailed Breakdown</Badge>
            <Badge variant="outline" className="px-4 py-2">Pre-approval Ready</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="homePrice">Home Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Down Payment: {downPayment}%</Label>
                <Slider
                  value={[downPayment]}
                  onValueChange={(value) => setDownPayment(value[0])}
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Amount: ${((homePrice * downPayment) / 100).toLocaleString()}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Payment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-primary-light text-white p-8 rounded-xl text-center shadow-lg">
                <p className="text-lg mb-3 opacity-90">Total Monthly Payment</p>
                <p className="text-5xl font-bold mb-2">${totalMonthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                <p className="text-sm opacity-80">Principal, Interest, Taxes & Insurance</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Principal & Interest</span>
                  <span className="font-bold">${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Property Tax</span>
                  <span className="font-bold">${propertyTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Home Insurance</span>
                  <span className="font-bold">${insurance.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Amount</span>
                    <span>${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Interest</span>
                    <span>${((monthlyPayment * numberOfPayments) - loanAmount).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total of Payments</span>
                    <span>${(monthlyPayment * numberOfPayments).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="luxury">
                Get Pre-Approved
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;