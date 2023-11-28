import React from 'react';
import { Grid, Item, Icon, Header, Segment, Statistic } from 'semantic-ui-react';

const SmartMeters = ({ meters }) => {
  return (
    <div>
      <Header as='h2' attached='top'> Smart Meters </Header>
      <Segment attached>
        <Grid columns={2} divided>
          {meters.map((meter, index) => (
            <Grid.Row key={index}>
              <Grid.Column>
                <Item.Group>
                  <Item>
                    <Item.Image>
                      <Icon name="plug" size="big" bordered circular />
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
              <Grid.Column  textAlign='center'>                
                <Statistic size='tiny'>
                  <Statistic.Label>Current Production</Statistic.Label>
                  <Statistic.Value>{`${meter.energy} KWh`}</Statistic.Value>
                  </Statistic>                                
                             
                </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </Segment>
    </div>
  );
};

export default SmartMeters;