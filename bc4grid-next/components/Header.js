
"use client";

import React from 'react';


import { Grid } from 'semantic-ui-react';

import MainMenu    from '@/components/MainMenu';
import User        from '@/components/UserMenu';
import Logo        from '@/components/ui/Logo';



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
          <Grid.Column width={12}>
            <Logo />
          </Grid.Column>          
          <Grid.Column width={3} textAlign='center'>
            <User name='User' />
          </Grid.Column>               
        </Grid.Row>
      </Grid>
    );
  };

export default Header;  