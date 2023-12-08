"use client";
import React, { useEffect, useState } from 'react';

import Orders from '@/components/Orders';

import { 
  Header, 
  Segment, 
  Table,   
  Button,   
  Message } from 'semantic-ui-react';

// ethExplorer
import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';


const messageStyles = {
  whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
  overflow: 'hidden',   // Hide overflow text
  textOverflow: 'ellipsis', // Add ellipsis to overflow text
  maxWidth: '100%', // Set a maximum width for the message
};



const Cart = ({ offers, onApprove }) => {
  const { Header, Row, HeaderCell, Body, Cell } = Table;

  const CartHeader = () => (
    <Header>
      <Row>
        <HeaderCell>ID</HeaderCell>
        <HeaderCell>Account</HeaderCell>
        <HeaderCell>Amount (KWh)</HeaderCell>
        <HeaderCell>Price per Unit</HeaderCell>
        <HeaderCell>Valid Until</HeaderCell>
        <HeaderCell>Total Price</HeaderCell>
        <HeaderCell>Approve?</HeaderCell>
      </Row>
    </Header>
  );

  const CartRow = ({ offer, onApprove }) => {
    const { key, account, amount, pricePerUnit, validUntil, totalPrice } = offer;

    return (
      <Row key={key}>
        <Cell>{key}</Cell>
        <Cell>{account}</Cell>
        <Cell>{amount}</Cell>
        <Cell>{pricePerUnit}</Cell>
        <Cell>{validUntil}</Cell>
        <Cell>{totalPrice}</Cell>
        <Cell>
          <Button.Group>
            <Button>✗</Button>
            <Button.Or />
            <Button onClick={() => onApprove(key)} primary>✓</Button>
          </Button.Group>
        </Cell>
      </Row>
    );
  };

  const renderRows = () => {
    return offers.map((offer) => (
      <CartRow
        key={offer.key} // Use the offer's key as the key prop
        offer={offer}
        onApprove={onApprove}
      />
    ));
  };

  return (
    <Segment>
      <Header as="h2">Cart</Header>
      <Table>
        <CartHeader />
        <Body>{renderRows()}</Body>
      </Table>
    </Segment>
  );
};


const BuyCreator = () => {
  const { ethExplorer } = useEthExplorer();
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (offer, checked) => {
    setSelectedItems(prevSelectedItems => {
      if (checked) {
        return [...prevSelectedItems, offer];
      } else {
        return prevSelectedItems.filter(item => item.key !== offer.key);
      }
    });
  };

  const onApprove = (offerId) => {
    console.log('Approving offer with ID:', offerId);
    // Implement the approval logic here
  };



  return (
    <>
      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Cart offers={selectedItems}  onApprove={onApprove}/>
      <Orders
        onCheckboxChange={handleCheckboxChange}
        selectedItems={selectedItems}
      />
    </>
  );
};

export default BuyCreator;

