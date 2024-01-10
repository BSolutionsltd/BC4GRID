import React, {useState, useEffect } from 'react';
import { Grid, Item, Icon, Header, Segment, Statistic } from 'semantic-ui-react';


function SmartMeter() {

  const [meter, setMeter] = useState({});
  const [data, setData] = useState({});

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
      fetch('/api/auth/smart-meter/balance')
        .then(response => response.json())
        .then(data => {
          console.log('smart-meter data:', data);
          setData(data);
        } );
    };

    fetchData();

    console.log('fetching data: ', data);

    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
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
                      <p>last update: {meter.update}</p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column  textAlign='center' verticalAlign='middle'>
            <Header as='h3'>Current</Header>                            
              <Statistic size='tiny'>                
                <Statistic.Label>Production</Statistic.Label>
                <Statistic.Value>{data.total_consumption ? `${(data.total_production).toFixed(2)}  KWh` : 'N/A'}</Statistic.Value>
              </Statistic>
              <Statistic size='tiny'>
                <Statistic.Label>Consumption</Statistic.Label>
                <Statistic.Value>{data.total_consumption ? `${(data.total_consumption).toFixed(2)}  KWh` : 'N/A'}</Statistic.Value>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default SmartMeter;