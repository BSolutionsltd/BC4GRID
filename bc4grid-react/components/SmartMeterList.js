import React from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';

const SmartMeterList = ({ meters }) => {
  return (
    <Item.Group divided>
      {meters.map((meter, index) => (
        <Item key={index}>
          <Item.Image>
            <Icon name="plug" size="big" />
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
  );
};

export default SmartMeterList;
