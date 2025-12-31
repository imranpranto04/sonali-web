import AboutCompany from "@/components/sections/landing/AboutCompany";
import AwardSection from "@/components/sections/landing/AwardSection";
import FAQ from "@/components/sections/landing/FAQ";
import Hero from "@/components/sections/landing/Hero";
import HomeProducts from "@/components/sections/landing/HomeProducts";
import InsuranceCalculator from "@/components/sections/landing/InsuranceCalculator";
import Testimonials from "@/components/sections/landing/Testimonials";
import WhyPreferUs from "@/components/sections/landing/WhyPreferUs";
import PartnerSection from "@/components/sections/landing/PartnerSection";
import MobileApp from "@/components/sections/landing/MobileApp";
import ContactUs from "@/components/common/ContactUs";

export default function HomePage() {
  return (
    <>
      <div className="">
        {/* <div className="mt-20 md:mt-32"> */}
        <Hero />
        <AboutCompany />
        <HomeProducts />
        <InsuranceCalculator />
        <WhyPreferUs />
        <AwardSection />
        <Testimonials />
        {/* <PartnerSection /> */}
        <FAQ />
        <MobileApp />
        <ContactUs />
      </div>
    </>
  );
}
