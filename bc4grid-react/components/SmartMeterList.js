import React from 'react';
import { Item, Icon, Button, Header, Segment } from 'semantic-ui-react';

const SmartMeterList = ({ meters }) => {
  return (
    <>      
      <Header as='h2' attached='top'> Smart Meters </Header>
    <Segment attached>
    <Item.Group divided>
      {meters.map((meter, index) => (
        <Item key={index}>
          <Item.Image>
            <Icon name="plug" size="big" bordered circular />
          </Item.Image>
          <Item.Content>
            <Item.Header>{meter.name}</Item.Header>
            <Item.Description>
              {meter.description}
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
    </Segment>
  </>
      
  );
};

export default SmartMeterList;
