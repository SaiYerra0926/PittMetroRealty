import TechHeader from "@/components/tech/TechHeader";
import TechHero from "@/components/tech/TechHero";
import TechServices from "@/components/tech/TechServices";
import TechPortfolio from "@/components/tech/TechPortfolio";
import TechProcess from "@/components/tech/TechProcess";
import TechTechnologies from "@/components/tech/TechTechnologies";
import TechTestimonials from "@/components/tech/TechTestimonials";
import TechAbout from "@/components/tech/TechAbout";
import TechContact from "@/components/tech/TechContact";
import TechFooter from "@/components/tech/TechFooter";

const TechIndex = () => {
  return (
    <div className="min-h-screen">
      <TechHeader />
      <TechHero />
      <TechServices />
      <TechPortfolio />
      <TechProcess />
      <TechTechnologies />
      <TechTestimonials />
      <TechAbout />
      <TechContact />
      <TechFooter />
    </div>
  );
};

export default TechIndex;
