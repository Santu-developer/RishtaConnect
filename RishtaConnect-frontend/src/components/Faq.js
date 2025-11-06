// import React, { useState, useEffect } from 'react';
// import "../styles/styles.css";
// import "../styles/faq.css";
// import ApiService from "../services/ApiService"; 

// const Faq = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const [faqData, setFaqData] = useState([]);  // State to store FAQ data
//   const [loading, setLoading] = useState(true);  // State for loading state
//   const [error, setError] = useState(null);  // State for error handling

//   // Fetch FAQ data when the component mounts
//   useEffect(() => {
//     const fetchFAQ = async () => {
//       try {
//         const data = await ApiService.getFAQ();  // Call the API service to get FAQ data
//         setFaqData(data);  // Update the FAQ data state with the API response
//       } catch (err) {
//         setError("Failed to load FAQ data.");  // Set error if the request fails
//       } finally {
//         setLoading(false);  // Set loading to false once the data is fetched or failed
//       }
//     };

//     fetchFAQ();  // Call the fetchFAQ function
//   }, []);  // Empty dependency array to run only once on mount

//   const handleToggle = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);  // Toggle the answer visibility
//   };

//   if (loading) {
//     return <div>Loading...</div>;  // Show a loading message while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>;  // Show an error message if there's an error
//   }






//   const faqData = [
//     {
//       question: 'What is a Matrimonial site?',
//       answer: 'A Matrimonial site is a platform designed to help individuals find life partners by providing matchmaking services.',
//     },
//     {
//       question: 'How does it work?',
//       answer: 'Users create profiles, search for compatible matches, and connect with potential partners through the site.',
//     },
//     {
//       question: 'How do I find a partner?',
//       answer: 'You can find a partner by browsing profiles, applying filters based on your preferences, and contacting matches.',
//     },
//     {
//       question: 'How do I purchase a package?',
//       answer: 'Packages can be purchased through the pricing page. Choose a plan, make the payment, and enjoy the benefits.',
//     },
//     {
//       question: 'What services do you offer?',
//       answer: 'We offer matchmaking, profile creation, personalized suggestions, and communication tools to help you find a partner.',
//     },
//     {
//       question: 'What are success stories?',
//       answer: 'Success stories are testimonials from users who found their partners through our platform.',
//     },
//     {
//       question: 'What packages are available?',
//       answer: 'We offer various packages tailored to different needs. Check our pricing page for more details.',
//     },
//     {
//       question: 'Is there an age restriction?',
//       answer: 'Yes, users must be 18 years or older to use the platform.',
//     },
//   ];
//  const handleToggle = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };
 

//   return (
//     <div className="container-max-width faq-container">
//       <h2 className="faq-header">Frequently Asked Questions</h2>
//       <p className="faq-description">Find answers to common queries about our services and platform.</p>
//       <div className="faq-list">
//         {faqData.map((item, index) => (
//           <div key={index} className="faq-item">
//             <div
//               className="faq-question"
//               onClick={() => handleToggle(index)}
//             >
//               {item.question}
//               <span className={`faq-icon ${activeIndex === index ? 'active' : ''}`}>
//                 {activeIndex === index ? '-' : '+'}
//               </span>
//             </div>
//             <div
//               className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
//             >
//               <p>{item.answer}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Faq;




import React, { useState } from "react";
import "../styles/styles.css";
import "../styles/faq.css";
import faqData from "../components/data/faqData.json"; // Import the static JSON file

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State for active question
  const [data] = useState(faqData); // Use static data from the JSON file

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle visibility
  };

  return (
    <div className="container-max-width faq-container">
      <h2 className="faq-header">Frequently Asked Questions</h2>
      <p className="faq-description">Find answers to common queries about our services and platform.</p>
      <div className="faq-list">
        {data.map((item, index) => (
          <div key={item.id || index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => handleToggle(index)}
            >
              {item.question}
              <span className={`faq-icon ${activeIndex === index ? "active" : ""}`}>
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? "active" : ""}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
