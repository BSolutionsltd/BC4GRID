import React, { useState, useEffect } from 'react';
import { useEnergyData } from '@/app/energy/context/EnergyDataProvider';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';
import { useSession } from 'next-auth/react';
import { Grid, Icon, Segment, Statistic, Button, ButtonContent } from 'semantic-ui-react';

// tokenize energy
function EnergyTokenizer() {
  const {data : session } = useSession();
  const { ethExplorer } = useEthExplorer();
  const { 
    data, 
    setData, 
    tokenizationTime, 
    setTokenizationTime } = useEnergyData();

  const [accumulatedData, setAccumulatedData] = useState(0);

  // states of data retrieval
  const [loading, setLoading] = useState(false); // Add loading state
    
  // Load accumulatedData from server when component mounts

  // update accumulatedData in database when dataPoints changes
  useEffect(() => {
    // reducer function to sum up the total production
    const accumulatedValue = data.reduce((accumulator, dataPoint) => accumulator + dataPoint.total_production, 0);
    //console.log('accumulatedValue: ', accumulatedValue);
    setAccumulatedData(accumulatedValue);     
    
  }, [data]);

  const handleTokenize = async () => {
    setLoading(true); // Set loading state to true

    // send energy to blockchain
    if (accumulatedData > 0) {
      // Convert to a whole number by multiplying by 10^18 (similar to how Ether is converted to Wei in Ethereum)
      const totalProductionWatts = BigInt(Math.round(accumulatedData * 1000));
      // Send the energy to the blockchain
      ethExplorer.sendEnergy(totalProductionWatts)
        .then((receipt) => {
          const newTokenTime = new Date().toISOString();
          //console.log('new token time: ', newTokenTime);
          setTokenizationTime(newTokenTime);          
          // Update accumulated energy in the database
          fetch('/api/auth/smart-meter/balance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.user.id, // Replace with the actual user id
              accumulatedEnergy: accumulatedData, // set energy for tokenization
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
                <Statistic.Value>{accumulatedData ? accumulatedData.toFixed(2) : 0} KWh</Statistic.Value>
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
