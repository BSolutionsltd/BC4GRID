import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Table, Segment } from 'semantic-ui-react';
import App from '../components/App';
import { OffersHeader, OffersRow, MakeOffer } from '../components/Sell';
import { Market } from '../components/Market';

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
    <App>
    <Sell offers = {offers} market = {market}/>
    </App>
  );
}

export default SellPage;
