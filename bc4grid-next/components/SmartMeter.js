import React, { useState, useEffect, useContext } from 'react';

// layout components
import { Grid, Item, Icon, Header, Segment, Statistic } from 'semantic-ui-react';

// global contexts
import { useEnergyData } from '@/app/energy/context/EnergyDataProvider';

// energy monitor component
import EnergyMonitor from '@/components/EnergyMonitor';
import EnergyTokenizer from '@/components/EnergyTokenizer';



function SmartMeter() {

  const { data, setData }  = useEnergyData();
  const [latestData, setLatestData] = useState({});
  const [meter, setMeter] = useState({});    

  useEffect(() => {
    fetch('/api/auth/smart-meter/info')
      .then(response => response.json())
      .then(info => {
        console.log('smart-meter info:', data);
        setMeter(info);
      });
  }, []);

  useEffect(() => {
    if (data) setLatestData(data[data.length - 1]);
    console.log('latestData on SmartMeter: ', latestData);
  }, [data, latestData]);
 

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
                <Statistic.Value>{latestData?.total_production ? `${(latestData.total_production).toFixed(2)}  KWh` : '0 KWh'}</Statistic.Value>
              </Statistic>
              <Statistic size='tiny' color='red'>
                <Statistic.Label>Consumption</Statistic.Label>
                <Statistic.Value>{latestData?.total_consumption ? `${(latestData.total_consumption).toFixed(2)}  KWh` : '0 KWh'}</Statistic.Value>
              </Statistic>
              <p>measure time: {new Date(latestData?.time).toLocaleString()}</p>
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