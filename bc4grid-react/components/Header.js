import React from 'react';
import { Grid } from 'semantic-ui-react';

import Logo  from './Logo';
import AccountInfo from './AccountInfo';
import MainMenu    from './MainMenu';
import User from './User';

const Header = () => {
    return (
      <Grid columns={4} padded='vertically' verticalAlign='middle'>
        <Grid.Row only="mobile">
          <Grid.Column width={8}>
            <Logo />
          </Grid.Column>
          <Grid.Column width={8}>
            <MainMenu />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="mobile">
          <Grid.Column width={16}>
            <AccountInfo />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="mobile">
          <Grid.Column width={16}>
            <User name='User' />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row only="tablet">
          <Grid.Column width={8}>
            <Logo />
          </Grid.Column>
          <Grid.Column width={8}>
            <MainMenu />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="tablet">
        <Grid.Column width={2}>        
            </Grid.Column>  
          <Grid.Column width={12}>
            <AccountInfo />
          </Grid.Column>
          <Grid.Column width={2} textAlign='right'>
            <User name='User' />
          </Grid.Column>
        </Grid.Row>
        
        <Grid.Row only="computer">
          <Grid.Column width={3}>
            <Logo />
          </Grid.Column>
          <Grid.Column width={11}>
            <AccountInfo />
          </Grid.Column>
          <Grid.Column width={1}>
            <User name='User' />
          </Grid.Column>
          <Grid.Column width={1}>
            <MainMenu />
          </Grid.Column>        
        </Grid.Row>
      </Grid>
    );
  };

export default Header;  