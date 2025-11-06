import React from "react";
import { useParams } from "react-router-dom";
import "../styles/storiesDetails.css";
import successStoriesData from "../components/data/successStoriesData";
import Footer from "../components/Footer";

const StoriesDetailsPage = () => {
  const { id } = useParams();
  
  // Get the selected story based on ID, default to first story
  const selectedStory = successStoriesData.find(story => story.id === parseInt(id)) || successStoriesData[0];
  
  // Get other stories for sidebar (exclude selected story)
  const otherStories = successStoriesData.filter(story => story.id !== selectedStory.id);
  
  // Split into popular (first 4) and latest (remaining)
  const popularStories = otherStories.slice(0, 4);
  const latestStories = otherStories.slice(4);

  return (
    <>
      <div className="details-container">
        <div className="container-max-width details-wrapper">
          <div className="image-with-text">
            <img src={selectedStory.image} alt={selectedStory.coupleName} />
            <h2>{selectedStory.coupleName}'s Love Story</h2>
            <p>{selectedStory.storyText}</p>
          </div>
          <div className="popular-with-latest">
            {/* Popular Stories */}
            <div>
              <h4>Popular Stories</h4>
              {popularStories.map((story) => (
                <div key={story.id} className="couple-story-card" onClick={() => window.location.href = `/stories-detail/${story.id}`} style={{ cursor: 'pointer' }}>
                  <img src={story.image} alt={story.coupleName} />
                  <div className="couple-story-card-text">
                    <p className="couple-names">{story.coupleName}</p>
                    <p className="story-highlight-text">
                      {story.storyText.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Latest Stories */}
            <div className="latest-post-container">
              <h4>Latest Stories</h4>
              {latestStories.map((story) => (
                <div key={story.id} className="couple-story-card" onClick={() => window.location.href = `/stories-detail/${story.id}`} style={{ cursor: 'pointer' }}>
                  <img src={story.image} alt={story.coupleName} />
                  <div className="couple-story-card-text">
                    <p className="couple-names">{story.coupleName}</p>
                    <p className="story-highlight-text">
                      {story.storyText.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoriesDetailsPage;
