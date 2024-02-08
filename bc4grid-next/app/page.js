"use client";
import React from 'react';
import { 
  Container, 
  Header, 
  Button, 
  Divider, 
  Image, 
  Segment,
  Grid 
} from 'semantic-ui-react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';


const LandingPage = () => {

  const { data: session } = useSession();
  const router = useRouter()

  const handleClick = () => {
    if (session?.user) router.push('/dashboard');
    else router.push('/auth/login');
  };
  return (
  <div>
  
    <Segment style={{ padding: '8em 0em' }} vertical>
    <Header as='h1' textAlign='center' style={{marginBottom: '10vh'}}>Empowering Energy Independence Through Blockchain</Header>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h2'>
            Peer-to-Peer Energy Trading Made Simple and Secure
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Discover a new way to trade energy with our dApp, a fresh take on peer-to-peer
        electricity transactions. At its core, our platform is built for simplicity, enabling you
        to effortlessly buy and sell energy within your community.
            </p>
            
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image alt='' bordered rounded size='large' src='images/hero/bc4grid.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
          <Button primary size='huge' style={{ marginTop: '20px' }} onClick={handleClick}>Get Started</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


   
  </div>
);
  }

export default LandingPage;