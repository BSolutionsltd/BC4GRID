import React, { Component } from 'react';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';

// semantic-ui
import SmartMeterList from '../components/SmartMeterList';

class App extends Component {

  state = {
    accounts: [],
    balance: '',
    meterData: [
      { name: 'Smart Meter 1', description: 'Description for Smart Meter 1' },
      { name: 'Smart Meter 2', description: 'Description for Smart Meter 2' },
      // Add more meter data objects as needed
    ]
  };

  meters = [
    { name: 'Smart Meter 1', description: 'Description for Smart Meter 1' },
    { name: 'Smart Meter 2', description: 'Description for Smart Meter 2' },
    // Add more meter data objects as needed
  ];

  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();     
    return { accounts }; // Return accounts as an object
  }

  

  render() {
    return (      
      <Layout>
       <SmartMeterList meters={ this.state.meterData }/>
      </Layout>      
    );
  }
}

export default App;
