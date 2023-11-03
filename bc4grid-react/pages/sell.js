import React, { Component } from 'react';
// next components
import Link from 'next/link';

// semantic ui components
import { Button, Table, Segment } from "semantic-ui-react";

// custom components
import Layout from '../components/Layout';
import {OffersHeader, OffersRow, MakeOffer} from '../components/Sell';
import Market from '../components/Market';




class Sell extends Component {

  state = {
    offers : [
      { id: 1, amount: '10kWh', pricePerUnit: '2wei', totalPrice : '20wei' },
      { id: 2, amount: '20kWh', pricePerUnit: '3wei', totalPrice : '60wei' }
    ]
  }
    

  renderRows() {
    return this.state.offers.map((offer) => {
      return (
        <OffersRow
          key = {offer.id}
          id = {offer.id}
          amount = {offer.amount}
          pricePerUnit = {offer.pricePerUnit}
          totalPrice = { offer.totalPrice }
        />
      );
    });
  }
  
  render() {

   const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <Segment>
        <h3>Make an offer</h3>
        <MakeOffer />        
        <h3>Your Offers</h3>
        <Table>
          <OffersHeader />
          <Body>{this.renderRows()}</Body>
        </Table>
        </Segment>

        <Segment>
        <h3>Market</h3>
          <Market />
        </Segment>
      </Layout>
    );
    }
}

export default Sell;
