"use client";
import React, { useEffect, useState } from 'react';

import Orders from '@/components/Orders';

import Cart from '@/components/Cart';

import { 
  Header, 
  Segment, 
  Table,   
  Button,   
  Message } from 'semantic-ui-react';

// ethExplorer
import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

// cart items
import { useSelectedOrders } from '@/app/(trading)/context/OrdersContext';


const messageStyles = {
  whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
  overflow: 'hidden',   // Hide overflow text
  textOverflow: 'ellipsis', // Add ellipsis to overflow text
  maxWidth: '100%', // Set a maximum width for the message
};




const BuyCreator = () => {
  const { ethExplorer } = useEthExplorer();
  const { selectedOrders, setSelectedOrders } = useSelectedOrders();
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);


  useEffect(() => {
    const fetchAccount = async () => {
      try {
          const fetchedAccount = await ethExplorer.getUserAccount();
          // Transform the offer details to match the expected data structure
          setAccount(fetchedAccount);
        
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };
  
    fetchAccount();
  }, [ethExplorer])
  


  const handleFinalize = async (offerId) => { 
    try { 
      // Find the offer to finalize 
      console.log('Looking for offer id: ', offerId);
      console.log('Offers: ', selectedOrders);
      const offerToFinalize = selectedOrders.find(offer => offer.key === offerId); 
      if (!offerToFinalize) { throw new Error('Offer not found'); 
    }

    
     // Execute the createEnergyOffer function on the blockchain
      const response = await ethExplorer.buyEnergyFromOffer(
        offerToFinalize.key,
        offerToFinalize.amount,
        50000        
      );
      
      // Log the transaction hash and receipt
    console.log('Transaction Hash:', response.transactionHash);
    console.log('Transaction Receipt:', response.receipt);

    // Handle error if any
    if (response.error) {
      alert('Transaction Error in finalize:', response.error);
       // Remove the offer from the list
       const updatedOrders = selectedOrders.filter(offer => offer.key !== offerId);
       setSelectedOrders(updatedOrders);
       return;
    }
  
    // Update the offer as finalized in the local state
    const updatedOffers = selectedOrders.map(offer =>
      offer.id === offerId ? { ...offer, isFinalized: true } : offer
    );
    setSelectedOrders(updatedOffers);

    console.log('Energy offer finalized successfully!');
  } catch (err) {
    setError('Error finalizing energy offer: ' + err.message);
  }
};

const onDiscard = (offerId) => {
  // Filter out the offer with the specified id
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
      <Orders />
      
    </>
  );
};

export default BuyCreator;

