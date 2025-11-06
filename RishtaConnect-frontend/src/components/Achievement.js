import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../styles/styles.css";
import "../styles/achievements.css";

const Achievement = () => {
  const [counters, setCounters] = useState({
    profiles: 0,
    marriages: 0,
    families: 0,
    communities: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const achievements = useMemo(() => [
    {
      icon: "fa-user",
      number: "50,000+",
      targetNumber: 50000,
      key: "profiles",
      description: "Verified Indian Profiles",
    },
    {
      icon: "fa-check-circle",
      number: "15,000+",
      targetNumber: 15000,
      key: "marriages",
      description: "Successful Marriages",
    },
    {
      icon: "fa-smile",
      number: "75,000+",
      targetNumber: 75000,
      key: "families",
      description: "Happy Families",
    },
    {
      icon: "fa-trophy",
      number: "100+",
      targetNumber: 100,
      key: "communities",
      description: "Communities Served",
    },
  ], []);

  const animateCounters = useCallback(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames for smooth animation
    const interval = duration / steps;

    achievements.forEach((achievement) => {
      let currentCount = 0;
      const increment = achievement.targetNumber / steps;

      const timer = setInterval(() => {
        currentCount += increment;
        
        if (currentCount >= achievement.targetNumber) {
          currentCount = achievement.targetNumber;
          clearInterval(timer);
        }

        setCounters((prev) => ({
          ...prev,
          [achievement.key]: Math.floor(currentCount),
        }));
      }, interval);
    });
  }, [achievements]);

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const sectionElement = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [hasAnimated, animateCounters]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section className="achievement-section" ref={sectionRef}>
      <div className="container-max-width achievement-container">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-card">
            <div className="achievement-icon">
              <i className={`fa ${achievement.icon}`}></i>
            </div>
            <div className="achievement-number">
              {formatNumber(counters[achievement.key])}+
              <div className="achievement-description">
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievement;
