"use client";
import React from 'react';

import { Header, List } from 'semantic-ui-react';

export default function AboutPage() {
  return (
    <>
      <Header as='h1' textAlign='center'>About</Header>

      <Header as='h1'>Project</Header>
      <p>
      The development of this application was supported by the EU H2020 SMART4ALL #3 CTTE "BC for creating decentralized smart grid system (BC4GRID)" project. BC4GRID aims to utilize Blockchain technology in the electricity sector as a crucial tool for transitioning to decentralized smart grids. The project's goal is to create Blockchain software for smart grids that can optimize existing processes, secure grid management, and enable energy trading. The result will be novel Blockchain software with enhanced trustworthiness and reliability in the smart grid sector, allowing energy producers, consumers, and prosumers, as well as all related stakeholders, to have timely, accurate, and reliable information on energy consumption, trading, and system maintenance.

BC4GRID has a significant impact on sensitive social groups in two ways:
- The first impact relates to people with serious health issues, those with many outdoor activities, babies and infants suffering from air pollution, the elderly, and residents of cities with high Air Quality Index.
- The second impact addresses long-term energy poverty. Introducing smart grids into households will solve energy deficiencies, improve energy efficiency, and contribute to a cleaner, more sustainable environment. 

Moreover, the decentralization of energy supply will economically benefit individual households by enabling local energy trade and consumption, primarily through Blockchain technologies.


      </p>

      <Header as='h2'>Project Partners</Header>
      <List bulleted>
        <List.Item>
          <Header as='h3'>Mathematical Institute of the Serbian Academy of Sciences and Arts (MISANU)</Header>
          <p>Part of the Serbian Academy of Sciences and Arts, specializes in mathematics, mechanics, and computer science research and focuses on advanced research, industry applications, and international collaboration.</p>
        </List.Item>
        <List.Item>
          <Header as='h3'>INCEPTON</Header>
          <p>A Croatian SME developing data-driven models in commercial software projects for smart energy grid solutions, including custom-made software for the industry.</p>
        </List.Item>
        <List.Item>
          <Header as='h3'>B Solutions doo (BSN)</Header>
          <p>A Montenegrin SME with a proven track record in marketing and commercialization, responsible for marketing, commercialization, and expansion to the South-East Europe market.</p>
        </List.Item>
      </List>

      <Header as='h2'>Application</Header>
      <p>This distributed application represents a Blockchain software solution based on cryptographic technology. It was developed to support the transition of power grids from a centralized to a decentralized model, offering functionalities for prosumers and consumers to monitor their energy production and consumption. It also provides an energy market for users to sell excess energy or buy energy from others in a decentralized manner.

The application serves as a starting point for product developers, students, and researchers to develop new products using Blockchain technology. It facilitates learning and experimentation with different consensus protocols and cryptographic algorithms and techniques.

Key components include:
<List bulleted>
<List.Item> Ethereum smart contracts for core functionalities. </List.Item>
<List.Item> A user web interface using the Web3.js library and Metamask wallet to communicate with the Ethereum blockchain platform hosting the smart contracts. </List.Item>
<List.Item> A smart meter simulator that emulates energy consumption and production based on real-life data.</List.Item>
</List>
</p>
      </>    
  );
}