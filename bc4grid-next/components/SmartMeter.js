import React, { useState, useEffect, useContext } from 'react';

import { Grid, Item, Icon, Header, Segment, Statistic } from 'semantic-ui-react';

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

import EnergyGraph from '@/components/EnergyGraph';


function SmartMeter() {

  const refreshInterval = 1 * 60 * 1000; // 1 minute

  const { ethExplorer } = useEthExplorer();
  const [meter, setMeter] = useState({});
  const [data, setData] = useState({});
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    fetch('/api/auth/smart-meter/info')
      .then(response => response.json())
      .then(info => {
        console.log('smart-meter info:', data);
        setMeter(info);
      });
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const now = new Date();
      setTimestamp(now.toISOString());

      fetch('/api/auth/smart-meter/balance')
        .then(response => response.json())
        .then(data => {
          console.log('smart-meter data:', data);
          setData(data);
        } );
        console.log('fetching data: ', data);
    };

    fetchData();
  
    
    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  // send energy to blockchain
  useEffect(() => {
    if (data && data.total_production != null) {
      // Convert to a whole number by multiplying by 10^18 (similar to how Ether is converted to Wei in Ethereum)
      const totalProductionWatts = BigInt(Math.round(data.total_production * 1000));
      ethExplorer.sendEnergy(totalProductionWatts);
    }
  }, [data && data.total_production]);

  return (
    <>
      <Header as='h2' attached='top'> Smart Meters </Header>
      <Segment attached>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Item.Group>
                <Item>
                  <Item.Image>
                    <Icon name="superpowers" size="huge" bordered circular />
                  </Item.Image>
                  <Item.Content>
                    <Item.Header>{meter.name}</Item.Header>
                    <Item.Description>
                      <p>description: {meter.description}</p>
                      <p>serial number: {meter.SN}</p>                      
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column  textAlign='center' verticalAlign='middle'>
               <Statistic size='tiny'>                
                <Statistic.Label>Production</Statistic.Label>
                <Statistic.Value>{data.total_consumption ? `${(data.total_production).toFixed(2)}  KWh` : 'N/A'}</Statistic.Value>
              </Statistic>
              <Statistic size='tiny'>
                <Statistic.Label>Consumption</Statistic.Label>
                <Statistic.Value>{data.total_consumption ? `${(data.total_consumption).toFixed(2)}  KWh` : 'N/A'}</Statistic.Value>
              </Statistic>
              <p>last update: {new Date(timestamp).toLocaleString()}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>       
      </Segment>
      <Segment style = {{marginBottom: '20vh' }}>
      <EnergyGraph data={data} />
      </Segment>    

    </>
  );
};

export default SmartMeter;