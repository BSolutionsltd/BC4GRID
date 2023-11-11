// Buy.js
import React, { useState } from 'react';
import { Button, Table, Segment } from 'semantic-ui-react';
import App from '../components/App';
import { Cart } from '../components/Buy';
import { Market } from '../components/Market';

const Buy = ({ cart, market }) => {
  const [cartItems] = useState(cart);
  const [marketItems] = useState(market);

  return (
    <div>
      <Segment>
        <h3>Cart</h3>
        <Cart offers={cartItems} />
      </Segment>

      <Segment>
        <h3>Market</h3>
        <Market marketItems={marketItems} isBuyPage={true} />
      </Segment>
    </div>
  );
};

const BuyPage = () => {
  const cart = [
    { id: 1, account: 'Bob', amount: '50kWh', pricePerUnit: '2wei', totalPrice: '100wei' },
    { id: 2, account: 'Alice:', amount: '10kWh', pricePerUnit: '3wei', totalPrice: '30wei' },
  ];

  const market = [
    { account: 'Account 1', amount: 100, pricePerUnit: 10, totalPrice: 1000 },
    { account: 'Account 2', amount: 200, pricePerUnit: 8, totalPrice: 1600 },
    { account: 'Account 3', amount: 150, pricePerUnit: 12, totalPrice: 1800 },
  ];

  return (
    <App>
      <Buy cart={cart} market={market} />
    </App>
  );
};

export default BuyPage;
