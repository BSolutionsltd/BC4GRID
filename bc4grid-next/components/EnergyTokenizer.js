import React, { useState, useEffect } from 'react';
import { useEnergyData } from '@/app/energy/context/EnergyDataProvider';
import { Header, Button, Grid, Segment, Statistic, Loader } from 'semantic-ui-react';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';
import { useSession } from 'next-auth/react';

function EnergyTokenizer() {

  const {data : session } = useSession();

  const { ethExplorer } = useEthExplorer();
  const [dataPoints, setDataPoints] = useEnergyData();  
  const [accumulatedData, setAccumulatedData] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state
  
  // Load accumulatedData from server when component mounts
 useEffect(() => {
  if (session) {
    const userId = session.user.id; // Assuming the user object has an id property
    fetch(`/api/smart-meter/balance?userId=${userId}`)
      .then(response => response.json())
      .then(data => setAccumulatedData(data.accumulatedData));
  }
}, [session]);

  useEffect(() => {
    console.log('dataPoints: ', dataPoints);
    // Accumulate the data points
    
    const accumulatedValue = dataPoints.reduce((accumulator, dataPoint) => accumulator + dataPoint.total_production, 0);

    console.log('accumulatedValue: ', accumulatedValue);
    setAccumulatedData(accumulatedValue);    
  }, [dataPoints]);

  const handleTokenize = async () => {
    setLoading(true); // Set loading state to true

    // send energy to blockchain
    if (accumulatedData > 0) {
      // Convert to a whole number by multiplying by 10^18 (similar to how Ether is converted to Wei in Ethereum)
      const totalProductionWatts = BigInt(Math.round(accumulatedData * 1000));
      // Send the energy to the blockchain
      ethExplorer.sendEnergy(totalProductionWatts)
        .then((receipt) => {
          setAccumulatedData(0);
          setLoading(false); // Set loading state to false when sendEnergy returns receipt
        })
        .catch((error) => {
          console.error('Error sending energy:', error);
          setLoading(false); // Set loading state to false in case of error
        });
    }  
  };

  return (
    <>
      <Header as='h2' attached='top'> Energy Tokenizer </Header>
      <Segment attached textAlign='center'>
        <Statistic size='tiny'>
          <Statistic.Label>Accumulated Energy for tokenization</Statistic.Label>
          <Statistic.Value>{accumulatedData.toFixed(2)} KWh</Statistic.Value>
        </Statistic>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleTokenize} color='blue' loading={loading}>
             Tokenize
          </Button>
        </div>
      </Segment>
    </>
  );
}

export default EnergyTokenizer;
