'use client'
import { useEffect, useState } from 'react';
import bc4grid from '@/lib/bc4grid/ethExplorer'; // Update with the actual path
import { Container, Header, Segment, Message, List, Form, Button } from 'semantic-ui-react';

export default function HomePage() {
  const [ethExplorer, setEthExplorer] = useState(null);
  const [error, setError] = useState(null);
  const [energyAmount, setEnergyAmount] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [pricePerEnergyAmount, setPricePerEnergyAmount] = useState('');

  useEffect(() => {
    const initializeBlockchain = async () => {
      try {
        console.log('Initializing blockchain...');
        const explorer = await bc4grid();
        console.log('Blockchain initialized:', explorer);
        setEthExplorer(explorer);
      } catch (err) {
        console.error('Error initializing blockchain:', err);
        setError(err.message || 'An unknown error occurred');
      }
    };

    initializeBlockchain();
  }, []);

  const handleCreateOffer = async () => {
    try {
      // Convert energyAmount to a number
      const energyAmountNumber = Number(energyAmount);
      // Convert validUntil to a Unix timestamp
      const validUntilTimestamp = Math.floor(new Date(validUntil).getTime() / 1000);
      // Convert pricePerEnergyAmount to a number
      const pricePerEnergyAmountNumber = Number(pricePerEnergyAmount);

      // Call the createEnergyOffer function from the ethExplorer instance
      await ethExplorer.createEnergyOffer(
        energyAmountNumber,
        validUntilTimestamp,
        pricePerEnergyAmountNumber
      );
      // Reset form fields after successful submission
      setEnergyAmount('');
      setValidUntil('');
      setPricePerEnergyAmount('');
      alert('Energy offer created successfully!');
    } catch (err) {
      console.error('Error creating energy offer:', err);
      setError(err.message || 'An unknown error occurred while creating the offer');
    }
  };

  return (
    <Container>
      <Header as="h1" textAlign="center" style={{ margin: '1em 0' }}>
        Ethereum Blockchain Data
      </Header>

      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      {!ethExplorer && !error && (
        <Segment loading>
          <p>Loading blockchain data...</p>
        </Segment>
      )}

      {ethExplorer && (
        <>
          <Segment>
            <Header as="h2">Account Information</Header>
            <p>Account: {ethExplorer.userAccount || 'No account connected.'}</p>

            <Header as="h2">Network Information</Header>
            <p>Network ID: {ethExplorer.netId.toString() || 'Unable to determine network ID.'}</p>
          </Segment>

          <Segment>
            <Header as="h2">Available Contracts</Header>
            <List>
              {Object.entries(ethExplorer.contractDetails).map(([contractName, contractDetails]) => (
                <List.Item key={contractName}>
                  <strong>{contractName}</strong> - Address: {contractDetails.address}
                </List.Item>
              ))}
            </List>
          </Segment>

          <Segment>
            <Header as="h2">Create Energy Offer</Header>
            <Form>
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
              <Button type='submit' onClick={handleCreateOffer}>Create Offer</Button>
            </Form>
          </Segment>
        </>
      )}
    </Container>
  );
}
