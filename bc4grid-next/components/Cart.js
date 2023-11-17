import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";


const { Row, Cell, Body } = Table;

const CartHeader = () => {
    const {Header, Row, HeaderCell} = Table;

    return (
        <Header>
            <Row>
            <HeaderCell>ID</HeaderCell>
              <HeaderCell>Account (KWh)</HeaderCell>
              <HeaderCell>Account (KWh)</HeaderCell>
              <HeaderCell>Price per Unit</HeaderCell>
              <HeaderCell>Total Price </HeaderCell>
              <HeaderCell>Approve?</HeaderCell>              
            </Row>
          </Header>
        );
}


const CartRow = ({ id, account, amount, pricePerUnit, totalPrice }) => {
  const onApprove = async () => {
    // Implement the onApprove functionality
  };

  const onFinalize = async () => {
    // Implement the onFinalize functionality
  };

  

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{account}</Cell>
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


const Cart = ( {offers} ) => {

    const renderRows = ( offers ) => {
        return offers.map((offer) => {
            return (
              <CartRow
                key = {offer.id}
                id = {offer.id}
                account = {offer.account}
                amount = {offer.amount}
                pricePerUnit = {offer.pricePerUnit}
                totalPrice = { offer.totalPrice }
              />
            );
          });

    }
    return (
    <Table>
          <CartHeader />
          <Body>{renderRows(offers)}</Body>
    </Table>
    )
}

export default Cart;