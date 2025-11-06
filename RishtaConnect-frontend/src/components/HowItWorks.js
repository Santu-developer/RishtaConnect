import React from 'react';
import "../styles/styles.css"
import "../styles/howItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      title: 'Register & Create Profile',
      icon: 'user-circle',
      description: 'Create your detailed profile with photos, family details, horoscope, and partner preferences. Registration is quick, easy, and completely free.',
    },
    {
      title: 'Search Compatible Matches',
      icon: 'search',
      description: 'Use advanced filters to search by caste, religion, location, education, profession, and more. Browse verified profiles that match your preferences.',
    },
    {
      title: 'Connect & Communicate',
      icon: 'comments',
      description: 'Express interest, send personalized messages, shortlist profiles, and start meaningful conversations with potential life partners.',
    },
  ];

  return (
    <section className="how-it-works">
      <div className='how-it-works-wrapper'>
        <h2>How It Works</h2>
        <p>
          Finding your perfect life partner is now easier than ever with RishtaConnect! Our platform is designed 
          specifically for Indian families seeking compatible matches. Follow these simple steps to begin your 
          journey towards a happy married life. Join thousands of successful couples who found their soulmate 
          through our trusted matrimonial service.
        </p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-icon">
                <i className={`fa fa-${step.icon}`}></i>
                <div className="step-number">
                  <p>{index + 1}</p>
                </div>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;