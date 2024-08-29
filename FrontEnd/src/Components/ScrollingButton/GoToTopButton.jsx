import React, { useState, useEffect } from 'react';
import './GoToTopButton.css'; // Optional: Styling
import * as Icon from 'react-bootstrap-icons'
const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down by a certain amount
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };

  // Add the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="go-to-top-button" onClick={scrollToTop}>
          <Icon.CaretUpFill/>
        </div>
      )}
    </>
  );
};

export default GoToTopButton;
