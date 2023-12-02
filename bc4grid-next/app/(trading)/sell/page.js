
"use client";

import React, { useState } from 'react';

import { Table, Form, Segment, Button } from 'semantic-ui-react';

import  Market  from '@/components/Market';



const MakeOffer = () => {
  const [amount, setAmount] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPricePerUnit(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission, e.g., sending the offer data to the server
    console.log("Amount: ", amount);
    console.log("Price per Unit: ", pricePerUnit);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Amount (KWh)</Table.Cell>
            <Table.Cell>
              <Form.Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Price per Unit</Table.Cell>
            <Table.Cell>
              <Form.Input
                type="number"
                value={pricePerUnit}
                onChange={handlePriceChange}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary type="submit" floated="right">
        Make Offer
      </Button>
    </Form>
  );
};


const OffersHeader = () => {
    const {Header, Row, HeaderCell} = Table;

    return (
        <Header>
            <Row>
            <HeaderCell>ID</HeaderCell>
              <HeaderCell>Amount (KWh)</HeaderCell>
              <HeaderCell>Price per Unit</HeaderCell>
              <HeaderCell>Total Price </HeaderCell>
              <HeaderCell>Approve?</HeaderCell>              
            </Row>
          </Header>
        );
}


const OffersRow = ({ id, amount, pricePerUnit, totalPrice }) => {
  const onApprove = async () => {
    // Implement the onApprove functionality
  };

  const onFinalize = async () => {
    // Implement the onFinalize functionality
  };

  const { Row, Cell } = Table;

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{amount}</Cell>
      <Cell>{pricePerUnit}</Cell>
      <Cell>{totalPrice}</Cell>
      <Cell>
      <Button.Group>
        <Button>✗</Button>
        <Button.Or />
        <Button primary>✓</Button>
  </Button.Group>
      </Cell>
    </Row>
  );
};





const Sell = ({offers, market}) => { 
  // I want to re-render components on change
  const [sellItems] = useState(offers);
  const [marketItems] = useState(market);

  const renderRows = (offers) => {
    return offers.map((offer) => (
      <OffersRow
        key={offer.id}
        id={offer.id}
        amount={offer.amount}
        pricePerUnit={offer.pricePerUnit}
        totalPrice={offer.totalPrice}
      />
    ));
  };

  return (
    <div>
      <Segment>
        <h3>Make an offer</h3>
        <MakeOffer />
        <h3>Your Offers</h3>
        <Table>
          <OffersHeader />
          <Table.Body>{renderRows(marketItems)}</Table.Body>
        </Table>
      </Segment>

      <Segment>
        <h3>Market</h3>
        <Market marketItems={marketItems} isBuyPage={false}/>
      </Segment>
    </div>
  );
};


const SellPage = () => {
  const offers = [
    { id: 1, account: 'Bob', amount: '50kWh', pricePerUnit: '2wei', totalPrice: '100wei' },
    { id: 2, account: 'Alice:', amount: '10kWh', pricePerUnit: '3wei', totalPrice: '30wei' },
  ]
  
  const market = [
    { account: "Account 1", amount: 100, pricePerUnit: 10, totalPrice: 1000 },
    { account: "Account 2", amount: 200, pricePerUnit: 8, totalPrice: 1600 },
    { account: "Account 3", amount: 150, pricePerUnit: 12, totalPrice: 1800 }
  ]



  return (    
    <Sell offers = {offers} market = {market}/>
    
  );
}

export default SellPage;
