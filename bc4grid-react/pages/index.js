import React, { Component } from 'react';
import App from '../components/App';
import Footer from '../components/Footer';

// semantic-ui
const HomePage = () => {
  return <h3>Welcome to the home page!</h3>;
}


const IndexPage = () => {
  return (
    <App>
      <HomePage />
      <Footer />
    </App>
  );
};

export default IndexPage;
