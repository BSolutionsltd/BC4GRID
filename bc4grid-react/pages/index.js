import React, { Component } from 'react';
import Layout from '../components/Layout';
import AccountInfo from '../components/AccountInfo';
import { Link } from '../routes';
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

  renderAccountInfo() {
    const  accounts  = this.props.accounts;

    return (
      <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='small'
          src='/images/avatar/person.png'
        />
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          A Blockchain PowerGrid enthusiast!
        </Card.Description>      
          <List>
            {accounts.map((account, index) => (
              <List.Item key={index}>Account {index + 1}: {account}</List.Item>
            ))}
          </List>          
        </Card.Content>
      </Card>
    );
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
