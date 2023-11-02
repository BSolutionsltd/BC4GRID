import React from 'react';
import { Segment, Grid, Divider } from 'semantic-ui-react';

const BalanceInfo = ({ balanceKwh, price }) => {
    
  return (
    <Segment padded='very' >
      <Grid columns={2} relaxed='very' stackable textAlign='center'>        
          <Grid.Column>
            <strong>Balance (kWh):  {balanceKwh}</strong>
          </Grid.Column>
          <Grid.Column>
            <strong>Price: {price}</strong>
          </Grid.Column>          
      </Grid>
    </Segment>
  );
};

export default BalanceInfo;
