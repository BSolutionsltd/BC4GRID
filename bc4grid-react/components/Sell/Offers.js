import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";


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




export {OffersHeader, OffersRow};