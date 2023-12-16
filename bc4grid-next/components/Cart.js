import React, { Component } from "react";
import { Table, Button, Segment, Header } from "semantic-ui-react";


const { Row, Cell, Body } = Table;

const CartHeader = () => {
    const {Header, Row, HeaderCell} = Table;

    return (
        <Header>
            <Row>
            <HeaderCell>ID</HeaderCell>
              <HeaderCell>Account (KWh)</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Price per Unit</HeaderCell>
              <HeaderCell>Valid Until</HeaderCell>
              <HeaderCell>Total Price </HeaderCell>
              <HeaderCell>Approve?</HeaderCell>              
            </Row>
          </Header>
        );
}


const CartRow = ({ id, account, amount, pricePerUnit, totalPrice, validUntil, isFinalized, onFinalize, onDiscard }) => {

  
  return (
    <Table.Row>      
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{account}</Table.Cell>
      <Table.Cell>{amount}</Table.Cell>
      <Table.Cell>{pricePerUnit}</Table.Cell>
      <Table.Cell>{new Date(validUntil).toLocaleString()}</Table.Cell>
      <Table.Cell>{totalPrice}</Table.Cell>
      <Table.Cell>
      {!isFinalized && (
          <Button.Group>                        
            <Button onClick={() => onDiscard(id)}>✗</Button>
            <Button.Or />
            <Button onClick={() => onFinalize(id)} primary>✓</Button>
          </Button.Group>
        )}
    {isFinalized && <Icon name='checkmark' color='green' />}
      </Table.Cell>
    </Table.Row>
  );

 
};


const Cart = ({ offers, onFinalize, onDiscard }) => {
  const renderRows = (offers) => {

    console.log('Offers: ', offers);
    return offers.map((offer) => {
      return (
        <CartRow
          key={offer.key}
          id={offer.key}
          account={offer.account}
          amount={offer.amount}
          pricePerUnit={offer.pricePerUnit}
          totalPrice={offer.totalPrice}
          validUntil={offer.validUntil}
          onFinalize={onFinalize}
          onDiscard={onDiscard}
          isFinalized={offer.isFinalized}
        />
      );
    });
  };

  return (
    <Segment style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column' }}>
    <Header as="h2">Cart</Header>
    
    {offers.length > 0 ? (
      <Table>
        <CartHeader />
        <Body>{renderRows(offers)}</Body>
      </Table>
    ) : (
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>No offers available</p>
      </div>
    )}
  </Segment>
  );
};

export default Cart;