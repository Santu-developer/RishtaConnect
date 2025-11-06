import React from "react";
import ContactForm from "../components/ContactForm";
import Faq from "../components/Faq";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <ContactForm />
      <Faq />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Contact;
