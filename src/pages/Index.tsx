import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AdvancedSearch from "@/components/AdvancedSearch";
import FeaturedProperties from "@/components/FeaturedProperties";
import MarketInsights from "@/components/MarketInsights";
import PropertyComparison from "@/components/PropertyComparison";
import MortgageCalculator from "@/components/MortgageCalculator";
import PropertyValuation from "@/components/PropertyValuation";
import Services from "@/components/Services";
import TestimonialsSection from "@/components/TestimonialsSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AdvancedSearch />
      <FeaturedProperties />
      <PropertyComparison />
      <MarketInsights />
      <MortgageCalculator />
      <PropertyValuation />
      <Services />
      <TestimonialsSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
