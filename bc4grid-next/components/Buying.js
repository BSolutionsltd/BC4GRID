"use client";

import React, { useEffect, useState } from 'react';


// ethExplorer
import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

// cart items
import { useSelectedOrders } from '@/app/(trading)/context/OrdersContext';


import Orders from '@/components/Orders';

import Cart from '@/components/Cart';

import { Message } from 'semantic-ui-react';


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

  const [finalizedOrders, setFinalizedOrders] = useState([]);


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
      const offerToFinalize = selectedOrders.find(offer => offer.key === offerId); 
      if (!offerToFinalize) { throw new Error('Offer not found');   }    
    
    
     // Execute the createEnergyOffer function on the blockchain
      const response = await ethExplorer.buyEnergyFromOffer(
        offerToFinalize.key,
        offerToFinalize.amount,
        50000        
      );
      
    

    // Handle error if any
    if (response.error) {
      alert('Transaction Error in finalize:', response.error);
       // Remove the offer from the list
       const updatedOrders = selectedOrders.filter(offer => offer.key !== offerId);
       setSelectedOrders(updatedOrders);
       return;
    }
     

    // Update the offer as finalized in the local state
    const updatedOffers = selectedOrders.map(offer => (
      offer.key === offerId ? { ...offer, isFinalized: true} : offer       
      )
    );

    // update offers as state
    setSelectedOrders(updatedOffers);

    const finalizedOffers = updatedOffers.filter(offer => offer.isFinalized); 

    setFinalizedOrders(finalizedOffers);

    console.log('Finalized offers: ', finalizedOffers);
        
    } catch (err) {
      setError('Error finalizing energy offer! Check if Metamask is installed in browser and logged in.');
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
      <Orders orders = {finalizedOrders}/>
      
    </>
  );
};

export default BuyCreator;

