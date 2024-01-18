import React, { useState, useEffect } from 'react';
import { useEnergyData } from '@/app/energy/context/EnergyDataProvider';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';
import { useSession } from 'next-auth/react';
import { Grid, Icon, Segment, Statistic, Button, ButtonContent } from 'semantic-ui-react';

function EnergyTokenizer() {

  const {data : session } = useSession();

  const { ethExplorer } = useEthExplorer();
  const [dataPoints, setDataPoints] = useEnergyData();  
  const [accumulatedData, setAccumulatedData] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state
  
  // Load accumulatedData from server when component mounts
 useEffect(() => {
  const fetchData = async () => {
    if (session) {
      const userId = session.user.id; // Assuming the user object has an id property      
      fetch(`/api/auth/smart-meter/balance?userId=${userId}`)
      .then(response => response.json())
      .then(data => {        
        setAccumulatedData(data.accumulatedEnergy);
      })
    }
  };

  fetchData();    
  }
, [session]);

  useEffect(() => {
    
    // Accumulate the data points    
    const accumulatedValue = dataPoints.reduce((accumulator, dataPoint) => accumulator + dataPoint.total_production, 0);
    
    setAccumulatedData(accumulatedValue); 
    
    // Update accumulated energy in the database
    fetch('/api/auth/smart-meter/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id, // Replace with the actual user id
        accumulatedEnergy: accumulatedValue,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Updated accumulated energy:', data);
    })
    .catch((error) => {
      console.error('Error updating accumulated energy:', error);
    });
    
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
        // Update accumulated energy in the database
        fetch('/api/auth/smart-meter/balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id, // Replace with the actual user id
            accumulatedEnergy: 0, // Reset accumulated energy to 0
          }),
        })
        .then(response => response.json())
        .then(data => {          
          setAccumulatedData(0);
          setLoading(false); // Set loading state to false when sendEnergy returns receipt
        })
        .catch((error) => {
          console.error('Error updating accumulated energy:', error);
          setLoading(false); // Set loading state to false in case of error
        });
      })
      .catch((error) => {
        console.error('Error sending energy:', error);
        setLoading(false); // Set loading state to false in case of error
      });
  }  
  };

     return (
      <>
        
        <Segment attached>
          <Grid columns={2} centered verticalAlign='middle'>        
            <Grid.Column>         
              <Statistic size='tiny'>
                <Statistic.Label>Accumulated Energy for tokenization</Statistic.Label>
                <Statistic.Value>{accumulatedData.toFixed(2)} KWh</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                 <Button animated onClick={handleTokenize} color='blue' loading={loading} >
                <ButtonContent visible>Tokenize</ButtonContent>
                <ButtonContent hidden>
                <Icon name='bitcoin' />
              </ButtonContent>
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </>
     )
}

export default EnergyTokenizer;
