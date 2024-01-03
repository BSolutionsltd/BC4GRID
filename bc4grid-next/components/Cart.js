import React, { useState } from "react";
import { 
  Table, 
  Button, 
  Segment, 
  Header, 
  Icon,
  Loader } from "semantic-ui-react";


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
              <HeaderCell>Approved</HeaderCell>              
            </Row>
          </Header>
        );
}


const CartRow = ({ offer, status, onFinalize, onDiscard }) => {
    const { key, account, amount, pricePerUnit, validUntil, totalPrice, isFinalized } = offer;
    console.log('Cart row:', offer);

    
  
  return (
    <Table.Row>      
      <Table.Cell>{key}</Table.Cell>
      <Table.Cell>{account}</Table.Cell>
      <Table.Cell>{amount}</Table.Cell>
      <Table.Cell>{pricePerUnit}</Table.Cell>
      <Table.Cell>{new Date(validUntil).toLocaleString()}</Table.Cell>
      <Table.Cell>{totalPrice}</Table.Cell>
      <Table.Cell>
      {!isFinalized && (
          <Button.Group>                        
            <Button onClick={() => onDiscard(key)}>✗</Button>
            <Button.Or />
            <Button loading= {status} onClick={() => onFinalize(key)} primary>✓</Button>
          </Button.Group>
        )}
    {isFinalized && <Icon name='checkmark' color='green' />}
      </Table.Cell>
    </Table.Row>
  );

 
};


const Cart = ({ offers, onFinalize, onDiscard }) => {
  
  const [finalizing, setFinalizing] = useState(false);

  const finalizeOrder = async (offerId) => {
    setFinalizing(true);
    await onFinalize(offerId);
    setFinalizing(false);
  }

  const finalizeDiscard = async (offerId) => {
    setFinalizing(true);
    await onDiscard(offerId);
    setFinalizing(false);
  }

  const renderRows = (offers) => {
    
    return offers.map((offer) => {
      return (
        <CartRow
          key={offer.key}
          offer={offer}
          status = {finalizing}
          onFinalize={finalizeOrder}
          onDiscard={finalizeDiscard}          
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
        <p>You don't have any new orders</p>
      </div>
    )}
  </Segment>
  );
};

export default Cart;