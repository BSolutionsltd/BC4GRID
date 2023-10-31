import React, { Component } from 'react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

// semantic-ui
import { Card, Button } from 'semantic-ui-react';

class Buy extends Component {
  // next.js interface for get values before rendering
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return {campaigns}; // return {campaings: campaings}
  }

  

  render() {

    return (
    <Layout>
    <div>        
        <h3>Offers</h3>
    </div>        
      </Layout>
      );
  }
}

export default Buy;
