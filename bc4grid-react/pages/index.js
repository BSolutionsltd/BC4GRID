import React, { Component } from 'react';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';

// semantic-ui
import { Card, Button, List, Image } from 'semantic-ui-react';

class App extends Component {
  state = {
    accounts: [],
    balance: ''
  };

  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();     
    return { accounts }; // Return accounts as an object
  }

  

  render() {
    return (      
      <Layout>
       <h1>Hello World!</h1>
      </Layout>      
    );
  }
}

export default App;
