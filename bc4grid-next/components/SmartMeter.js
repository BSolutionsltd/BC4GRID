import React, { useState, useEffect, useContext } from 'react';

// layout components
import { Grid, Item, Icon, Header, Segment, Statistic } from 'semantic-ui-react';

// global contexts
import { useEnergyData } from '@/app/energy/context/EnergyDataProvider';

// energy monitor component
import EnergyMonitor from '@/components/EnergyMonitor';
import EnergyTokenizer from '@/components/EnergyTokenizer';



function SmartMeter() {

  const [ dataPoints, setDataPoints ] = useEnergyData();
  
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
    if (dataPoints) setData(dataPoints[dataPoints.length - 1]);
  }, [dataPoints]);
 

  return (
    <>
      <Header as='h2' attached='top'> Smart Meter </Header>
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
               <Statistic size='tiny' color='green'>                
                <Statistic.Label>Production</Statistic.Label>
                <Statistic.Value>{data?.total_consumption ? `${(data.total_production).toFixed(2)}  KWh` : 'N/A'}</Statistic.Value>
              </Statistic>
              <Statistic size='tiny' color='red'>
                <Statistic.Label>Consumption</Statistic.Label>
                <Statistic.Value>{data?.total_consumption ? `${(data.total_consumption).toFixed(2)}  KWh` : 'N/A'}</Statistic.Value>
              </Statistic>
              <p>last update: {new Date(data?.timestamp).toLocaleString()}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>       
      </Segment>

      <Segment>
        <EnergyTokenizer />
      </Segment>

      <Segment style = {{marginBottom: '20vh' }}>
      <EnergyMonitor />
      </Segment>    

    </>
  );
};

export default SmartMeter;