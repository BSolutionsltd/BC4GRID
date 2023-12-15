"use client";
import React, { useEffect, useState } from 'react';

import MakeOffer from '@/components/MakeOffer';
import Offers from '@/components/Offers';

import {    
  Segment, 
  Table, 
  Button,   
  Message,
  Pagination,  
} from 'semantic-ui-react';


// ethExplorer
import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

const messageStyles = {
  whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
  overflow: 'hidden',   // Hide overflow text
  textOverflow: 'ellipsis', // Add ellipsis to overflow text
  maxWidth: '100%', // Set a maximum width for the message
};

// OffersHeader component
const OffersHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Amount (KWh)</Table.HeaderCell>
        <Table.HeaderCell>Price per Unit</Table.HeaderCell>
        <Table.HeaderCell>Valid until</Table.HeaderCell>
        <Table.HeaderCell>Total Price</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

// OffersRow component
const OffersRow = ({ id, amount, pricePerUnit, validUntil, totalPrice, onFinalize, onDiscard, isFinalized }) => {

  
  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
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
        {isFinalized && <span>Finalized</span>}
      </Table.Cell>
    </Table.Row>
  );
};


// OfferApproval component
const OfferApproval = ({ children, offers, onFinalize, onDiscard }) => {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(offers.length / itemsPerPage);
  const displayedOffers = offers.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  return (
    <Segment style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>        
        {children}
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          <Table>
            {offers.length > 0 && <OffersHeader />}
            <Table.Body>
              {displayedOffers.map((offer) => (
                <OffersRow
                  key={offer.id}
                  id={offer.id}
                  amount={offer.amount}
                  pricePerUnit={offer.pricePerUnit}
                  validUntil={offer.validUntil}
                  totalPrice={offer.totalPrice}
                  onFinalize={onFinalize}
                  onDiscard={onDiscard}
                  isFinalized={offer.isFinalized}
                />
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {offers.length >= itemsPerPage && (
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => setActivePage(activePage)}
          />
        )}
      </div>
    </Segment>
  );
};


// OfferCreator component (parent component)
const OfferCreator = () => {
  const { ethExplorer, setEthExplorer } = useEthExplorer();
  const [offers, setOffers] = useState([]); // State to hold offers
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
  }, [ethExplorer, account]);

  // Callback function to handle local offer creation (not yet on blockchain)
  const handleCreateOffer = (energyAmount, validUntil, pricePerEnergyAmount) => {
    const newOffer = {
      id: offers.length + 1, // This is a placeholder; you should use a unique identifier
      amount: energyAmount,
      pricePerUnit: pricePerEnergyAmount,
      validUntil: new Date(validUntil).getTime(), // Convert to timestamp
      totalPrice: parseFloat(energyAmount) * parseFloat(pricePerEnergyAmount), // Calculate total price
    };
    setOffers([...offers, newOffer]);
  };

  //finalization and blockchain transaction 
  const handleFinalize = async (offerId) => { 
    try { 
      // Find the offer to finalize 
      const offerToFinalize = offers.find(offer => offer.id === offerId); 
      if (!offerToFinalize) { throw new Error('Offer not found'); 
    }
    // Execute the createEnergyOffer function on the blockchain
      await ethExplorer.createEnergyOffer(
        offerToFinalize.amount,
        Math.floor(new Date(offerToFinalize.validUntil).getTime() / 1000),
        offerToFinalize.pricePerUnit
      );
  
  
    // Update the offer as finalized in the local state
    const updatedOffers = offers.map(offer =>
      offer.id === offerId ? { ...offer, isFinalized: true } : offer
    );
    setOffers(updatedOffers);

    alert('Energy offer finalized successfully!');
  } catch (err) {
    setError('Error finalizing energy offer: ' + err.message);
  }
};

const onDiscard = (offerId) => {
  // Filter out the offer with the specified id
  const updatedOffers = offers.filter(offer => offer.id !== offerId);
  setOffers(updatedOffers);
};

return (
  <>
    {error && (
      <Message negative style={messageStyles}>
        <Message.Header>Error</Message.Header>
        <p>{error}</p>
      </Message>
    )}
    {ethExplorer && (
      <>        
        <OfferApproval offers={offers} onFinalize={handleFinalize} onDiscard={onDiscard}>
        <MakeOffer 
            isEdit={false}
            onCreateOffer={handleCreateOffer} 
            trigger={
              <Button 
                primary 
                style={{ 
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto', 
                  marginTop: '10px', 
                  marginBottom: '10px' 
                }}
              >
                Make Offer
          </Button>
        } 
      />
        </OfferApproval>
        <Offers />
      </>
    )}
  </>
);
};

export default OfferCreator;

