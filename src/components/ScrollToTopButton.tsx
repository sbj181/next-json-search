import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  // State to manage the visibility of the button
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling to the top
    });
  };

  // Effect to add the scroll listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 bg-slate-700 text-white w-16 h-16 text-2xl rounded-md cursor-pointer hover:bg-slate-800 transition ease-in-out duration-300"
      aria-label="Scroll back to top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  ) : null;
};

export default ScrollToTopButton;
