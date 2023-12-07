"use client";

import { nanoid } from 'nanoid';

import React, { useState, useEffect } from "react";
import { Table, Segment, Checkbox, Input, Button, Dropdown, Grid } from "semantic-ui-react";
import bc4grid from "@/lib/bc4grid/ethExplorer";
import web3 from "web3";



const Market = ( { isBuyPage } ) => {
  // ethExplorer
  const [ethExplorer, setEthExplorer] = useState(null);
  const [error, setError] = useState(null);
 
  // market data
  const [data, setData] = useState([]);
  // selected items from market
  const [selectedItems, setSelectedItems] = useState([]);
  
  // search state
  const [searchColumn, setSearchColumn] = useState('account'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');


  // update data
  // initialize blockchain
  useEffect(() => {
    const initializeBlockchain = async () => {
      try {
        const explorer = await bc4grid();        
        setEthExplorer(explorer);
      } catch (err) {
        setError('Error initializing blockchain: ' + err.message);
      }
    };

    initializeBlockchain();
  }, []);

// Fetch offer details from the smart contract
useEffect(() => {
  const fetchOffers = async () => {
    try {
      const offerDetails = await ethExplorer.getAllOfferDetails();
      // Transform the offer details to match the expected data structure
      let transformedData = [];

      console.log('offerDetails: ', offerDetails);

      function generateShortId() {
        const size = 10; // Customize the size as needed
        return nanoid(size);
      }

      for (const offer of offerDetails) {
        // Convert the energy amount and price per energy amount to BigInt
        console.log('OFFER: ', offer);
        transformedData.push({
          key: Number(offer.offerId),
          account: web3.utils.toChecksumAddress(offer.sellerAddress),
          amount: Number(offer.energyAmount),
          pricePerUnit: Number(offer.pricePerEnergyAmount),
          validUntil: new Date(Number(offer.validUntil) * 1000).toLocaleDateString(),
          totalPrice: Number(offer.energyAmount) * Number(offer.pricePerEnergyAmount),
          
        });
      }
      setData(transformedData);

      console.log('All Offers: ', transformedData);
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
    { key: 'account', text: 'Account', value: 'account' },
    { key: 'amount', text: 'Amount', value: 'amount' },
    { key: 'pricePerUnit', text: 'Price per Unit', value: 'pricePerUnit' },
    { key: 'validUntil', text: 'Valid Until', value: 'validUntil' },
    { key: 'totalPrice', text: 'Total Price', value: 'totalPrice' },
  ];
  

  const handleCheckboxChange = (index, checked) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      const itemIndex = newSelectedItems.indexOf(index);
      newSelectedItems.splice(itemIndex, 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  // Filter data based on search query and selected column
  const filteredData = searchQuery.length > 0 ? data.filter(item => {
    const itemValue = item[searchColumn]?.toString().toLowerCase() || '';
    return itemValue.includes(searchQuery.toLowerCase());
  }) : data;

  const handleBuyClick = () => {
    const itemsToBuy = selectedItems.map((index) => data[index]);
    console.log(itemsToBuy);
    // Process the items to buy
  };


  // ui elements
  const { Header, Row, HeaderCell, Body, Cell } = Table;

  return (
    
  <div style={{overflowX : 'auto'}}>
      <Segment style={{ marginBottom: '200px', minHeight: '50vh'}}>
        <Header as="h2">Market</Header>
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
            {isBuyPage ? (
              <Table.HeaderCell>Actions</Table.HeaderCell>
            ) : null}
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
              {isBuyPage ? (
                <Table.Cell>
                  <Checkbox
                    checked={selectedItems.includes(index)}
                    onChange={(e, { checked }) => handleCheckboxChange(index, checked)}
                  />
                </Table.Cell>
              ) : null}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isBuyPage ? (
        <Button primary onClick={handleBuyClick}>Buy Selected</Button>
      ) : null}
      </Segment>	
    </div>
  );
  
};


export default Market;
