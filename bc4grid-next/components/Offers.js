"use client";
import React, { useState, useEffect } from "react";

import { 
  Table, 
  Segment,    
  Input, 
  Button, 
  Dropdown, 
  Grid,
  Modal,
  Form,
  
} from "semantic-ui-react";


import web3 from "web3";

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

const Offers = (  ) => {
  // ethExplorer
  // const [ethExplorer, setEthExplorer] = useState(null);
  // use ethExplorer
  const { ethExplorer, setEthExplorer } = useEthExplorer();
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
 
  // market data
  const [data, setData] = useState([]);
  // selected items from market
  const [selectedItems, setSelectedItems] = useState([]);
  
  // search state
  const [searchColumn, setSearchColumn] = useState('totalPrice'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');


  // edit offer
  const [open, setOpen] = React.useState(false);
  const [selectedOffer, setSelectedOffer] = React.useState(null);

  const handleEditClick = (offer) => {
    setSelectedOffer(offer);
    setOpen(true);
  };

  const handleUpdateOffer = (event) => {
    event.preventDefault();
    // Update the offer here
    console.log('Offer updated');
    // Close the modal
    setOpen(false);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setOpen(false);
  }

  const handleDeleteClick = (offerKeyToDelete) => {
    // Filter out the offer with the specified key
    const updatedData = data.filter(offer => offer.key !== offerKeyToDelete);
    setData(updatedData);
  
    // TODO: Delete the offer from the blockchain if necessary
  };
  

// Fetch offer details from the smart contract
useEffect(() => {
  const fetchOffers = async () => {
    try {
      const offerDetails = await ethExplorer.getAllOfferDetails();
      const fetchedAccount = await ethExplorer.getUserAccount();
      // Transform the offer details to match the expected data structure
      let transformedData = [];

      //console.log('offerDetails: ', offerDetails);
      

      for (const offer of offerDetails) {
        // Convert the energy amount and price per energy amount to BigInt        
        const transformedOffer = {
          key: Number(offer.offerId),
          account: web3.utils.toChecksumAddress(offer.sellerAddress),
          amount: Number(offer.energyAmount),
          pricePerUnit: Number(offer.pricePerEnergyAmount),
          validUntil: new Date(Number(offer.validUntil) * 1000).toLocaleDateString(),
          totalPrice: Number(offer.energyAmount) * Number(offer.pricePerEnergyAmount),
        };

        if (transformedOffer.account === fetchedAccount) {
          transformedData.push(transformedOffer);
        }
      }
      setData(transformedData);
      setAccount(fetchedAccount);

      //console.log('All Offers: ', transformedData);
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };

  fetchOffers();
}, [ethExplorer]);


   
  // search bar ops
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleColumnChange = (e, { value }) => {
    setSearchColumn(value);
  };
 
  const searchOptions = [
    {key: 'id', text: 'ID', value: 'key'},    
    { key: 'amount', text: 'Amount', value: 'amount' },
    { key: 'pricePerUnit', text: 'Price per Unit', value: 'pricePerUnit' },
    { key: 'validUntil', text: 'Valid Until', value: 'validUntil' },
    { key: 'totalPrice', text: 'Total Price', value: 'totalPrice' },
  ];
  

 
  // Filter data based on search query and selected column
  const filteredData = searchQuery.length > 0 ? data.filter(item => {
    const itemValue = item[searchColumn]?.toString().toLowerCase() || '';
    return itemValue.includes(searchQuery.toLowerCase());
  }) : data;

  
  // ui elements
  const { Header, Row, HeaderCell, Body, Cell } = Table;

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit', value: 'edit' },
    { key: 'cancel', icon: 'cancel', text: 'cancel', value: 'cancel' }
    
  ]

  return (
    
  <div style={{overflowX : 'auto'}}>
      <Segment style={{ marginBottom: '200px', minHeight: '50vh'}}>
        <Header as="h2">Your Offers</Header>
      <Grid>
        <Grid.Row>
        <Grid.Column width={16} textAlign="center">
        <Input         
          placeholder="Search..."
          action = {
            <Dropdown
              placeholder="Select Column"
              button 
              basic 
              floating
              options={searchOptions}
              value={searchColumn}
              onChange={handleColumnChange}
        />
          }
          icon = 'search'
          iconPosition='left'
          value={searchQuery}
          onChange={handleSearchChange}
        />     
        </Grid.Column>
        </Grid.Row>
        </Grid>
      <Table celled compact>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>  ID  </Table.HeaderCell>
          <Table.HeaderCell>  Account </Table.HeaderCell>
           <Table.HeaderCell> Amount </Table.HeaderCell>
            <Table.HeaderCell> Price per Unit </Table.HeaderCell>
            <Table.HeaderCell> Valid Until </Table.HeaderCell>
            <Table.HeaderCell>  Total Price  </Table.HeaderCell>
            <Table.HeaderCell>  Actions?  </Table.HeaderCell>
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredData.map((item, index) => (
            <Table.Row key={item.key}>
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>{item.account}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>{item.pricePerUnit}</Table.Cell>
              <Table.Cell>{item.validUntil}</Table.Cell>
              <Table.Cell>{item.totalPrice}</Table.Cell>    
              <Button.Group fluid  basic size='small'>              
              <Modal
                  open={open}                  
                  onClose={handleCloseModal}
                  trigger={<Button icon='edit' onClick={() => handleEditClick(item)} />}
                >
          <Modal.Header>Update Offer</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleUpdateOffer} >
            <Form.Field>
              <label>ID</label>
              <input placeholder='ID' defaultValue={selectedOffer?.key} disabled />
            </Form.Field>
              <Form.Field>
                <label>Amount</label>
                <input placeholder='Amount' defaultValue={selectedOffer?.amount} />
              </Form.Field>
              <Form.Field>
                <label>Price Per Unit</label>
                <input placeholder='Price Per Unit' defaultValue={selectedOffer?.pricePerUnit} />
              </Form.Field>
              <Form.Field>
                <label>Valid Until</label>
                <input type='date' placeholder='Valid Until' defaultValue={selectedOffer?.validUntil} />
              </Form.Field>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' primary>Submit</Button>
              </div>
              
            </Form>
          </Modal.Content>
        </Modal> 
          <Button icon='delete' onClick={() => handleDeleteClick(item)} />
              </Button.Group>          
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      </Segment>	
    </div>
  );
  
};


export default Offers;
