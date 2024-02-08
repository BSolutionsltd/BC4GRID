"use client";
import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const footerStyle = {
    height: '50px',
    minHeight: '15px',
    display: isAtBottom ? 'block' : 'none'
  };

  return (
    <Grid>
      <Grid.Column textAlign="center" style={footerStyle}>
        <strong>BC4GRID grant</strong>, funded by Smart4All, EU, 2023.
      </Grid.Column>
    </Grid>
  );
};

export default Footer;