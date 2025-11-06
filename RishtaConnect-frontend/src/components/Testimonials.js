import React from "react";
import Slider from "react-slick";
import "../styles/testimonials.css";
import testimonialsData from "../components/data/testimonialData";
import Avatar from "./Avatar";

const Testimonials = () => {
  const testimonialsettings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials">
      <h2>What Our Members Say</h2>
      <p>
        Real success stories from happy couples who found their perfect life partner through RishtaConnect. 
        Join thousands of satisfied Indian families who trusted us for their matchmaking journey.
      </p>
      <Slider {...testimonialsettings}>
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-avatar">
              <div className="testimonial-image-container">
                <Avatar 
                  name={testimonial.name} 
                  size="xlarge" 
                  shape="circle"
                  style={testimonial.avatarStyle}
                />
              </div>
            </div>
            <p className="testimonial-feedback">{testimonial.feedback}</p>
            <div className="testimonial-info">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role}</p>
            </div>
            <div className="testimonial-rating">
              {"★".repeat(testimonial.rating)}
              {"☆".repeat(5 - testimonial.rating)}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;





// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "../styles/testimonials.css";
// import ApiService from "../services/ApiService"; // Import ApiService

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]); // State to store testimonials data
//   const [formData, setFormData] = useState({ name: "", feedback: "", role: "", image: "", rating: 0 }); // State for form data
//   const [isEdit, setIsEdit] = useState(false); // State to check if editing
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null); // State for selected testimonial for editing

//   const testimonialsettings = {
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     speed: 1000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   // Fetch all testimonials on component load
//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   // Fetch testimonials from the API
//   const fetchTestimonials = async () => {
//     try {
//       const data = await ApiService.getAllTestimonials(); // Call the API to get testimonials
//       setTestimonials(data); // Set testimonials to state
//     } catch (error) {
//       console.error("Error fetching testimonials:", error);
//     }
//   };

//   // Handle input change for the form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle adding or updating a testimonial
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (isEdit && selectedTestimonial) {
//   //     // Update existing testimonial
//   //     await handleUpdateTestimonial(selectedTestimonial.id);
//   //   } else {
//   //     // Create new testimonial
//   //     await handleCreateTestimonial();
//   //   }
//   // };

//   // Create a new testimonial
//   // const handleCreateTestimonial = async () => {
//   //   try {
//   //     await ApiService.createTestimonial(formData); // Call the API to create the testimonial
//   //     fetchTestimonials(); // Refresh the testimonials list
//   //     setFormData({ name: "", feedback: "", role: "", image: "", rating: 0 }); // Reset the form
//   //   } catch (error) {
//   //     console.error("Error creating testimonial:", error);
//   //   }
//   // };

//   // Update an existing testimonial
//   // const handleUpdateTestimonial = async (id) => {
//   //   try {
//   //     await ApiService.updateTestimonial(id, formData); // Call the API to update the testimonial
//   //     fetchTestimonials(); // Refresh the testimonials list
//   //     setIsEdit(false); // Reset edit mode
//   //     setFormData({ name: "", feedback: "", role: "", image: "", rating: 0 }); // Reset the form
//   //     setSelectedTestimonial(null); // Reset selected testimonial
//   //   } catch (error) {
//   //     console.error("Error updating testimonial:", error);
//   //   }
//   // };

//   // Handle editing a testimonial
//   // const handleEditTestimonial = (testimonial) => {
//   //   setIsEdit(true); // Enable edit mode
//   //   setSelectedTestimonial(testimonial); // Set the selected testimonial
//   //   setFormData({
//   //     name: testimonial.name,
//   //     feedback: testimonial.feedback,
//   //     role: testimonial.role,
//   //     image: testimonial.image,
//   //     rating: testimonial.rating,
//   //   }); // Pre-fill the form with selected testimonial data
//   // };

//   // Handle deleting a testimonial
//   // const handleDeleteTestimonial = async (id) => {
//   //   try {
//   //     await ApiService.deleteTestimonial(id); // Call the API to delete the testimonial
//   //     fetchTestimonials(); // Refresh the testimonials list
//   //   } catch (error) {
//   //     console.error("Error deleting testimonial:", error);
//   //   }
//   // };

//   return (
//     <div className="testimonials">
//       <h2>Testimonials</h2>
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Ipsum has been the industry's standard dummy text ever since.
//       </p>
//       <Slider {...testimonialsettings}>
//         {testimonials.map((testimonial, index) => (
//           <div key={index} className="testimonial-card">
//             <div className="testimonial-avatar">
//               <div className="testimonial-image-container">
//                 <img src={testimonial.image} alt={testimonial.name} />
//                 <div className="avatar-border"></div>
//               </div>
//             </div>
//             <p className="testimonial-feedback">{testimonial.feedback}</p>
//             <div className="testimonial-info">
//               <h3>{testimonial.name}</h3>
//               <p>{testimonial.role}</p>
//             </div>
//             <div className="testimonial-rating">
//               {"★".repeat(testimonial.rating)}
//               {"☆".repeat(5 - testimonial.rating)}
//             </div>
//             {/* <button onClick={() => handleEditTestimonial(testimonial)}>Edit</button>
//             <button onClick={() => handleDeleteTestimonial(testimonial.id)}>Delete</button> */}
//           </div>
//         ))}
//       </Slider>

//       {/* Add/Edit Testimonial Form */}
//       {/* <div className="testimonial-form">
//         <h3>{isEdit ? "Edit Testimonial" : "Add New Testimonial"}</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="feedback">Feedback</label>
//             <textarea
//               id="feedback"
//               name="feedback"
//               value={formData.feedback}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="role">Role</label>
//             <input
//               type="text"
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="image">Image URL</label>
//             <input
//               type="text"
//               id="image"
//               name="image"
//               value={formData.image}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="rating">Rating (1-5)</label>
//             <input
//               type="number"
//               id="rating"
//               name="rating"
//               value={formData.rating}
//               onChange={handleInputChange}
//               min="1"
//               max="5"
//               required
//             />
//           </div>
//           <button type="submit">{isEdit ? "Update Testimonial" : "Add Testimonial"}</button>
//         </form>
//       </div> */}
//     </div>
//   );
// };

// export default Testimonials;
