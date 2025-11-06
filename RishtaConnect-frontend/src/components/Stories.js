import React from "react";
import "../styles/stories.css";
import successStories from "../components/data/successStoriesData";
import { Link } from "react-router-dom";

const Stories = () => {
  return (
    <section className="success-stories">
      <div className="container-max-width success-stories-wrapper">
        <h2>Success Stories</h2>
        <p>
          Our successful stories are varied. These are awesome, romantic, like a
          dream.
        </p>

        <div className="stories-container">
          {/* Add your success stories here */}
          {successStories.map((story) => (
            <div key={story.id} className="story">
              <img src={story.image} alt={story.coupleName} />
             <Link to={`/stories-detail/${story.id}`}> <div className="overlay-text">
                <h3>{story.coupleName}</h3>
                <p>{story.storyText}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
