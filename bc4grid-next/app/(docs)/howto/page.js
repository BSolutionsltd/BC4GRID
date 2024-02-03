"use client";
import React from 'react';


import { 
  Header, 
  List,  
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
      <Header as='h1'>User Guide</Header>

     
      <Segment style={style.segment} >
      <Header as='h2'>Introduction</Header>
      <p>
      The platform features a web-based interface designed for decentralized peer-to-peer energy trading, enabling participants to engage in market transactions effectively. Registered and authenticated participants gain market access, allowing them to tokenize generated electricity, create new trading offers, and purchase from the existing ones.
      </p>

      <Header as='h2'>Registration/Login</Header>
      <p>
      Before gaining access to the marketplace, participants must register to create their unique account. This involves providing necessary details and setting up authentication credentials. Once registered, users can log in using their credentials to authenticate and access the full suite of market functionalities. The login process is secured to ensure the safety of user accounts and maintain the integrity of the trading environment.
      </p>
      
      <Header as='h2'>Metamask Integration</Header>
      <p>
      Our trading application is integrated with MetaMask, a widely-used cryptocurrency wallet, to streamline your interactions with the blockchain. This integration offers convenience and enhanced security to safeguard your funds. To access the full range of information, including trading data, user blockchain account details, and energy production and consumption figures, an initial connection between the dApp and MetaMask is required. To connect the dApp to MetaMask wallet:
      </p>      

      <List ordered>
  <List.Item>Access the dApp web interface.</List.Item>
  <List.Item>Provide login credentials.</List.Item>
  <List.Item>If not connected to MetaMask, no trading data will appear.</List.Item>
  <List.Item>Follow prompts to establish a connection with MetaMask.</List.Item>
  <List.Item>Once connected, the user gains access to the full suite of dApp functionalities.</List.Item>
</List>
<p>
This connection is maintained for future sessions, removing the need to reconnect with MetaMask each time, unless the connection is manually removed or automatically reset due to system or browser settings.
</p>
      </Segment>

      <Header as='h2'>Application Panel Overview</Header>

      <p>
      The Dashboard panel offers users a comprehensive overview of their blockchain account and detailed insights from their smart meter. Key features include:
      </p>

      <Segment style={style.segment}>
      
      <Header as='h3'>Dashboard Panel</Header>
  <p>The Dashboard panel offers users a comprehensive overview of their blockchain account and detailed insights from their smart meter. Key features include:</p>
  <List bulleted>
    <List.Item>
      <List.Content>
        <List.Header>Blockchain Account Overview:</List.Header>
        </List.Content>
        <List.List>
          <List.Item>Displays the user&apos;s blockchain address.</List.Item>
          <List.Item>Shows the balance in ethers.</List.Item>
          <List.Item>Lists the amount of energy tokens the user possesses.</List.Item>
        </List.List>
     
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header>Smart Meter Integration:</List.Header>
        </List.Content>
        <List.List>
          <List.Item>Provides fine-grained readings from the user&apos;s registered smart meter.</List.Item>
          <List.Item>Details electrical consumption and production.</List.Item>
          <List.Item>Indicates the amount of produced energy available for tokenization.</List.Item>
        </List.List>      
    </List.Item>
  </List>
</Segment>
<Segment style={style.segment}>
  <Header as='h3'>Market Panel</Header>
<p>The Market panel provides a dynamic trading table that displays real-time market activity. It is equipped with visual indicators to help users stay on top of market fluctuations. Key details displayed in the trading table include:</p>
<List bulleted>
  <List.Item>
    <List.Content>
      <List.Header>Active Electricity Offers:</List.Header>
      <List.Description>A comprehensive list of current offers up for trade.</List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <List.Content>
      <List.Header>Seller Information:</List.Header>
      <List.Description>The account of the electricity seller.</List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <List.Content>
      <List.Header>Electricity Amount:</List.Header>
      <List.Description>The quantity of electricity available, shown in Watt-hours (Wh).</List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <List.Content>
      <List.Header>Unit Price:</List.Header>
      <List.Description>The cost per unit of electricity, listed in wei (the smallest denomination of ether).</List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <List.Content>
      <List.Header>Valid Until:</List.Header>
      <List.Description>The specific date and time until which the offer remains valid.</List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <List.Content>
      <List.Header>Total Price:</List.Header>
      <List.Description>The complete cost of the electricity offer.</List.Description>
    </List.Content>
  </List.Item>
</List>
<p>Users have the ability to browse through the table and select offers to purchase, enabling straightforward participation in the energy market.</p>
</Segment>
<Segment style={style.segment}>
<Header as='h3'>Buy Panel</Header>
<p>The Buy panel is organized to streamline the purchasing process within the dApp. It features two key components:</p>
<List bulleted>
  <List.Item>
    <List.Content>
      <List.Header>Cart for Selected Offers:</List.Header>
      <List.Description>Users can review the offers they have selected to purchase. This cart functionality allows them to verify their choices before committing to the transaction.</List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <List.Content>
      <List.Header>History of Realized Offers:</List.Header>
      <List.Description>A log of completed transactions is maintained for users to reference past purchases and monitor their activity within the market.</List.Description>
    </List.Content>
  </List.Item>
</List>
<p>To finalize a purchase:</p>
<List ordered>
  <List.Item>Review the offers in the cart to confirm they are correct.</List.Item>
  <List.Item>Initiate a buy transaction that will be sent to the blockchain; a MetaMask notification will provide details about the transaction cost.</List.Item>
  <List.Item>Confirm the transaction within MetaMask to execute the purchase.</List.Item>
</List>
<p>Once the transaction is validated and added to the blockchain, the purchase is completed and the user&apos;s account will be updated accordingly.</p>
</Segment>
<Segment style={style.segment}>

<Header as='h3'>Sell Panel</Header>
<p>The Sell panel empowers users to manage their market activities, particularly focusing on creating and tracking their own offers.</p>

<List bulleted>
  <List.Item>
    <List.Content>
      <List.Header>User&apos;s Offer Table:</List.Header>
      <List.Description>Displays the offers that the user has placed, allowing for easy tracking and management.</List.Description>
    </List.Content>
  </List.Item>

  <List.Item>
    <List.Content>
      <List.Header>Create an Offer:</List.Header>
      <List.Description>
        Users can put forth new offers to sell electricity on the market. To create an offer:
        <List ordered>
          <List.Item>Choose the expiration date and time for the offer to determine how long it will be available on the market.</List.Item>
          <List.Item>Set the price per energy unit in gwei, which is the denomination of ether used on the Ethereum blockchain.</List.Item>
          <List.Item>Define the quantity of energy available for sale, measured in kilowatt-hours (kWh).</List.Item>
          <List.Item>Submit the offer, which triggers a MetaMask notification outlining the transaction cost.</List.Item>
          <List.Item>Confirm the transaction through MetaMask to officially place the offer on the trading table.</List.Item>
        </List>
        The new offer will appear in the relevant tables, once this transaction is validated and recorded on the blockchain.
      </List.Description>
    </List.Content>
  </List.Item>

  <List.Item>
    <List.Content>
      <List.Header>Edit an Offer:</List.Header>
      <List.Description>
        Users also have the flexibility to modify the details of their existing offers. To modify an offer:
        <List ordered>
          <List.Item>Navigate to the offer you intend to adjust in your list of active offers.</List.Item>
          <List.Item>Select the <emph>edit offer</emph> option to edit the offer&apos;s details such as expiration date, price per energy unit, or quantity of energy.</List.Item>
          <List.Item>After making the desired changes, submit the modification, which will prompt a MetaMask notification detailing the associated transaction costs.</List.Item>
          <List.Item>Approve the modification via MetaMask to submit the changes to the blockchain.</List.Item>
        </List>
        The offer&apos;s updated details will be displayed on the trading table once the modification has been validated and accepted by the blockchain.
      </List.Description>
    </List.Content>
  </List.Item>

  <List.Item>
    <List.Content>
      <List.Header>Offer Cancellation:</List.Header>
      <List.Description>
        In addition to creating offers, users have can cancel any active offers they have made. To cancel an offer:
        <List ordered>
          <List.Item>Navigate to the offer you intend to adjust in your list of active offers.</List.Item>
          <List.Item>Initiate the cancellation process, which will send a request to the blockchain; this action will generate a MetaMask notification for confirmation.</List.Item>
          <List.Item>Confirm the cancellation through MetaMask to finalize the withdrawal of the offer from the trading table.</List.Item>
        </List>
        The offer will be removed from the market once the transaction is validated and recorded on the blockchain.
      </List.Description>
    </List.Content>
  </List.Item>
</List>

</Segment>
      </div>    
  );
  
}
