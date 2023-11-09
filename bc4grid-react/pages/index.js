import React, { Component } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

// semantic-ui
import SmartMeterList from '../components/SmartMeterList';

class Home extends Component {

  // API call /user/meters
  meters = [
    { name: 'Smart Meter 1', description: 'Description for Smart Meter 1' },
    { name: 'Smart Meter 2', description: 'Description for Smart Meter 2' },    
  ];



  render() {
    return (      
      <Layout>
       <SmartMeterList meters={ this.meters }/>
       <Footer />  
      </Layout>      
    );
  }
}

export default Home;
