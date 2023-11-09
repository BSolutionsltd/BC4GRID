import React, { Component } from 'react';
// next components

// semantic ui components
import { Button, Table, Segment } from "semantic-ui-react";

// custom components
import Layout from '../components/Layout';
import {Cart} from '../components/Buy'
import {Market} from '../components/Market';




class Buy extends Component {

  state = {
    offers : [
      { id: 1, account: 'Bob', amount: '50kWh', pricePerUnit: '2wei', totalPrice : '100wei' },
      { id: 2, account: 'Alice:', amount : '10kWh', pricePerUnit: '3wei', totalPrice : '30wei' }
    ]
  }      
  
  render() {

   return (
      <Layout>
        <Segment>
        <h3>Cart</h3>
        <Cart offers={this.state.offers}/>
        </Segment>

        <Segment>
        <h3>Market</h3>
          <Market isBuyPage={true} />
        </Segment>
      </Layout>
    );
    }
}

export default Buy;
