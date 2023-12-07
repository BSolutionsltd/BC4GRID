import React, { useEffect, useState } from 'react';
import bc4grid from '@/lib/bc4grid/ethExplorer'; // Update with the actual path
import { Container, Header, Segment, Table, Form, Button, Message } from 'semantic-ui-react';


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

// MakeOffer component
const MakeOffer = ({ onCreateOffer }) => {
  const [energyAmount, setEnergyAmount] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [pricePerEnergyAmount, setPricePerEnergyAmount] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Values: ', energyAmount, validUntil, pricePerEnergyAmount);

    const validateOffer = (...values) => {
        return values.every(value => value !== '');
    };

    if (!validateOffer(energyAmount, validUntil, pricePerEnergyAmount)) {
      setShowAlert(true);
    }
    else {
      setShowAlert(false);
      onCreateOffer(energyAmount, validUntil, pricePerEnergyAmount);
    }

    
  };

  return (
<Segment style={{ minHeight: '35vh' }}>
      <Header as="h2">Create Energy Offer</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Energy Amount</label>
          <input
            placeholder='Energy Amount'
            value={energyAmount}
            onChange={(e) => setEnergyAmount(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Valid Until</label>
          <input
            type="datetime-local"
            placeholder='Valid Until'
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Price Per Energy Amount (in Wei)</label>
          <input
            placeholder='Price Per Energy Amount'
            value={pricePerEnergyAmount}
            onChange={(e) => setPricePerEnergyAmount(e.target.value)}
          />
        </Form.Field>
        <div style={{ textAlign: 'center' }}>
        {showAlert ? (
        <Message
          negative
          header="Please fill in all fields"
          onDismiss={() => setShowAlert(false)}
        />
      ) : (
        <Button primary type="submit" style={{marginTop:'10px'}}>Create Offer</Button>
      )}   
      </div>
      </Form>     
    </Segment>
  );
};

// OfferApproval component
const OfferApproval = ({ offers, onFinalize, onDiscard }) => {
  return (
<Segment style={{ minHeight: '20vh' }}>
      <Header as="h2">Your Offers</Header>
      <Table>
      {offers.length > 0 && <OffersHeader />}
        <Table.Body>
          {offers.map((offer) => (
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
    </Segment>
  );
};

// OfferCreator component (parent component)
const OfferCreator = () => {
  const [ethExplorer, setEthExplorer] = useState(null);
  const [offers, setOffers] = useState([]); // State to hold offers
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeBlockchain = async () => {
      try {
        const explorer = await bc4grid();
        setEthExplorer(explorer);
      } catch (err) {
        setError('Error initializing blockchain: ' + err.message);
      }
    };

    initializeBlockchain();
  }, []);

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
        <MakeOffer onCreateOffer={handleCreateOffer} />
        <OfferApproval offers={offers} onFinalize={handleFinalize} onDiscard={onDiscard}/>
      </>
    )}
  </>
);
};

export default OfferCreator;

