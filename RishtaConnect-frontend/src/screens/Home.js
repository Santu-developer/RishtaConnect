import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import MatrimonialPackage from "../components/MatrimonialPackage";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Stories from "../components/Stories";
import Faq from "../components/Faq";
import Achievement from "../components/Achievement";
import Footer from "../components/Footer";
import "../styles/styles.css";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <div className="margin-home-for-matrimonial">
        <MatrimonialPackage />
      </div>
      <HowItWorks />
      <Stories />
      <Testimonials />
      <Faq />
      <Achievement />
      <Footer />
    </>
  );
};

export default Home;
