"use client";
import React from 'react';
import Link from 'next/link';

import { 
  Header, 
  List,
  ListItem,
  ListHeader,
  Segment } from 'semantic-ui-react';

export default function AboutPage() {
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',      
      padding: '10px'
      
    },
    segment: {
      width: '100%',
      textAlign: 'justify',
    },
  };

  
  return (
    <div style={style.container}>
      <Header as='h1' textAlign='center'>About</Header>

     
      <Segment style={style.segment} >
      <Header as='h2'>Project</Header>
      <p>
      The development of this application was supported by the <strong>EU H2020 SMART4ALL #3 CTTE BC for creating decentralized smart grid system (BC4GRID) </strong> project. BC4GRID aims to utilize Blockchain technology in the electricity sector as a crucial tool for transitioning to decentralized smart grids. The projects goal is to create Blockchain software for smart grids that can optimize existing processes, secure grid management, and enable energy trading. The result will be novel Blockchain software with enhanced trustworthiness and reliability in the smart grid sector, allowing energy producers, consumers, and prosumers, as well as all related stakeholders, to have timely, accurate, and reliable information on energy consumption, trading, and system maintenance.
      </p>
      <p>
BC4GRID has a significant impact on sensitive social groups in two ways:
</p>
<List bulleted>
        <ListItem> 
          The first impact relates to people with serious health issues, those with many outdoor activities, babies and infants suffering from air pollution, the elderly, and residents of cities with high Air Quality Index.
          </ListItem>
          <ListItem> The second impact addresses long-term energy poverty. Introducing smart grids into households will solve energy deficiencies, improve energy efficiency, and contribute to a cleaner, more sustainable environment. 
          </ListItem>
</List>
<p>
Moreover, the decentralization of energy supply will economically benefit individual households by enabling local energy trade and consumption, primarily through Blockchain technologies.    
</p>
      </Segment>
      <Segment style={style.segment}>
      <Header as='h2'>Project Partners</Header>
      <List bulleted>
        <ListItem>          
          <ListHeader as='a'>Mathematical Institute of the Serbian Academy of Sciences and Arts (MISANU)
          </ListHeader>
          Part of the Serbian Academy of Sciences and Arts, specializes in mathematics, mechanics, and computer science research and focuses on advanced research, industry applications, and international collaboration.
        </ListItem>
        <ListItem>
          <ListHeader as='a'>INCEPTON</ListHeader>
          A Croatian SME developing data-driven models in commercial software projects for smart energy grid solutions, including custom-made software for the industry.
        </ListItem>
        <ListItem>
          <ListHeader as='a'>B Solutions doo (BSN)</ListHeader>
          A Montenegrin SME with a proven track record in marketing and commercialization, responsible for marketing, commercialization, and expansion to the South-East Europe market.
        </ListItem>
      </List>
   
      </Segment>

      <Segment style={style.segment}>

      <Header as='h2'>Application</Header>
      <p>This distributed application represents a Blockchain software solution based on cryptographic technology. It was developed to support the transition of power grids from a centralized to a decentralized model, offering functionalities for prosumers and consumers to monitor their energy production and consumption. It also provides an energy market for users to sell excess energy or buy energy from others in a decentralized manner.

The application serves as a starting point for product developers, students, and researchers to develop new products using Blockchain technology. It facilitates learning and experimentation with different consensus protocols and cryptographic algorithms and techniques.
</p>

Key components include:
<List bulleted>
<ListItem> Ethereum smart contracts for core functionalities. </ListItem>
<ListItem> A user web interface using the Web3.js library and Metamask wallet to communicate with the Ethereum blockchain platform hosting the smart contracts. </ListItem>
<ListItem> A smart meter simulator that emulates energy consumption and production based on real-life data.</ListItem>
</List>

</Segment>
      </div>    
  );
  
}
