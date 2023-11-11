import React from 'react';
import { Grid } from 'semantic-ui-react';

import Logo  from './Logo';
import MainMenu    from './MainMenu';
import User from './Account/UserMenu';

const Header = () => {

    return (
      
      <Grid columns={4} padded='vertically' verticalAlign='middle'>
        <Grid.Row only="mobile">
        <Grid.Column width={4}>
            <MainMenu />
          </Grid.Column>
          <Grid.Column width={8}>
            <Logo />
          </Grid.Column>
          <Grid.Column width={4} textAlign='right'>
            <User name='User' />
          </Grid.Column>         
        </Grid.Row>        
     

        <Grid.Row only="tablet">
        <Grid.Column width={4}>
            <MainMenu />
          </Grid.Column>
          <Grid.Column width={8}>
            <Logo />
          </Grid.Column>
          <Grid.Column width={4} textAlign='right'>
            <User name='User' />
          </Grid.Column>         
        </Grid.Row>
        
        
        <Grid.Row only="computer">
        <Grid.Column width={1}>
            <MainMenu />
          </Grid.Column>   
          <Grid.Column width={14}>
            <Logo />
          </Grid.Column>          
          <Grid.Column width={1} textAlign='center'>
            <User name='User' />
          </Grid.Column>               
        </Grid.Row>
      </Grid>
    );
  };

export default Header;  