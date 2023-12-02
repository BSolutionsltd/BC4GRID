'use client';

import { useEffect, useState } from 'react';
import bc4grid from '@/lib/bc4grid/ethExplorer'; // Update with the actual path
import { Container, Header, Segment, Message,List } from 'semantic-ui-react';

export default function HomePage() {
  const [ethExplorer, setEthExplorer] = useState(null);
  const [error, setError] = useState(null);

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

  // Additional useEffect to check if ethExplorer has been set
  useEffect(() => {
    if (ethExplorer) {
      console.log('ethExplorer state updated:', ethExplorer);
    }
  }, []);

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
        </>
      )}
    </Container>
  );
}
