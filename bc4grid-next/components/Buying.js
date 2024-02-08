"use client";

import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';
import { useSelectedOrders } from '@/app/(trading)/context/OrdersContext';

import Orders from '@/components/Orders';
import Cart from '@/components/Cart';

const messageStyles = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
};

const BuyCreator = () => {
  const { ethExplorer } = useEthExplorer();
  const { selectedOrders, setSelectedOrders } = useSelectedOrders();

  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [finalizedOrders, setFinalizedOrders] = useState([]);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const fetchedAccount = await ethExplorer.getUserAccount();
        setAccount(fetchedAccount);
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };
    fetchAccount();
  }, [ethExplorer]);

  const handleFinalize = async (offerId) => {
    try {
      const offerToFinalize = selectedOrders.find(offer => offer.key === offerId);
      if (!offerToFinalize) {
        throw new Error('Offer not found');
      }

      const response = await ethExplorer.buyEnergyFromOffer(
        offerToFinalize.key,
        offerToFinalize.amount,
        50000
      );

      if (response.error) {
        alert('Transaction Error in finalize:', response.error);
        const updatedOrders = selectedOrders.filter(offer => offer.key !== offerId);
        setSelectedOrders(updatedOrders);
        return;
      }

      const updatedOffers = selectedOrders.map(offer => (
        offer.key === offerId ? { ...offer, isFinalized: true } : offer
      ));

      setSelectedOrders(updatedOffers);

      const finalizedOffers = updatedOffers.filter(offer => offer.isFinalized);
      setFinalizedOrders(finalizedOffers);

      console.log('Finalized offers: ', finalizedOffers);
    } catch (err) {
      setError('Error finalizing energy offer! Check if Metamask is installed in browser and logged in.');
    }
  };

  const onDiscard = (offerId) => {
    const updatedOrders = selectedOrders.filter(offer => offer.key !== offerId);
    setSelectedOrders(updatedOrders);
  };

  return (
    <>
      {error && (
        <Message negative style={messageStyles}>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Cart offers={selectedOrders} onFinalize={handleFinalize} onDiscard={onDiscard} />
      <Orders orders={finalizedOrders} />
    </>
  );
};

export default BuyCreator;
