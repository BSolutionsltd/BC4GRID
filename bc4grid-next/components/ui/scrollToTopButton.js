"use client";
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
  
    return (
      <div>
        {isVisible && 
          <Button 
          icon='arrow up' 
          onClick={scrollToTop} 
          style={{ 
            position: 'fixed', 
            bottom: '20px', // Vertical offset from the bottom
            right: '20px' // Horizontal offset from the right
          }} 
          />
          }
      </div>
    );
  }
  
  export default ScrollToTopButton;