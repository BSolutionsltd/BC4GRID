import React, { Component } from 'react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';


// semantic-ui
import { Card, Button } from 'semantic-ui-react';

class Buy extends Component {
  // next.js interface for get values before rendering
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return {campaigns}; // return {campaings: campaings}
  }

  // use semantic-ui-react to render components
  renderOffers() {
    const items = this.props.campaigns.map( (address) => {
      return {
        header : address,
        description: (
            <Link route={`/campaigns/${address}`}>
              <a>View Offer</a>
            </Link>
        ),
        fluid : true
      };
    });

    return < Card.Group items={items} />;
  }

  render() {

    return (
    <Layout>
    <div>
        
        <h3>Offers</h3>
        <Link route='/offers/new'>
          <a>
            <Button 
            content="Create Offer"
            floated="right"
            icon="add circle"
            primary = {true}      
          />
        </a>
      </Link>

      { this.renderOffers() }
      </div>
      </Layout>
      );
  }
}

export default Buy;
