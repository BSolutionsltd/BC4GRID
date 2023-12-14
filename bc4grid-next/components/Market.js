"use client";

import React, { useState, useEffect, useRef } from "react";
import { Table, Segment, Checkbox, Input, Button, Dropdown, Grid } from "semantic-ui-react";

import web3 from "web3";

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

import { useSelectedOrders } from '@/app/(trading)/context/OrdersContext';

// routing
import { useRouter } from 'next/navigation';


const Market = ( { isBuyPage } ) => {

  // style 
   // Define the CSS animation as a string
   const flashAnimation = `
   @keyframes flashAnimation {
     0% { background-color: #0E6EB8; }
     100% { background-color: transparent; }
   }

   .highlight-row {
     animation: flashAnimation 6s; /* Run the animation for 6 seconds */
   }
 `;
  
  // routing
  const router = useRouter()

  // use ethExplorer
  const { ethExplorer, setEthExplorer } = useEthExplorer();
  const { selectedOrders, setSelectedOrders } = useSelectedOrders();

  // errors
  const [error, setError] = useState(null);
 
  // market data
  const [data, setData] = useState([]);
  // new offer added
  const [newOfferId, setNewOfferId] = useState(null);
  // selected items from market
  const [selectedItems, setSelectedItems] = useState([]);
  
  // search state
  const [searchColumn, setSearchColumn] = useState('account'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');


  // Function to transform and filter offer data
  const transformAndFilterData = (offer) => {

    console.log('Offer before transformation: ', offer);
    return {
      key: Number(offer.id),
      account: web3.utils.toChecksumAddress(offer.seller),
      amount: Number(offer.energyAmount),
      pricePerUnit: Number(offer.pricePerEnergyAmount),
      validUntil: new Date(Number(offer.validUntil) * 1000).toLocaleDateString(),
      totalPrice: Number(offer.energyAmount) * Number(offer.pricePerEnergyAmount),
    };
  };


    // Ref to store the subscription object
    const subscriptionRef = useRef(null);

  // Subscribe to new offers
  useEffect(() => {
    if (!ethExplorer) {
      console.log('ethExplorer is not initialized yet.');
      return;
    }

    // Check if we already have an active subscription
    if (subscriptionRef.current) {
      console.log('Already subscribed to event.');
      return;
    }

    const subscribeToEvents = async () => {      
      const blockNumber = await ethExplorer.getBlockNumber();
      console.log('Subscribe to events ...');      
    const subscription = ethExplorer.getSubscription('OfferCreated');
    if (subscription) {
      console.log('Already subscribed to event.');
      subscriptionRef.current = subscription;
    }
      // Subscribe to the OfferCreated event
      subscriptionRef.current = await ethExplorer.subscribeToContractEvent(
        'Trading',
        'OfferCreated',
        blockNumber,
        (event) => {
          const newOffer = event.returnValues;
          const transformedOffer = transformAndFilterData(newOffer);
          // Update the state with the new offer after transforming and filtering
          setData((prevData) => [...prevData, transformedOffer]);
          // Set the new offer ID to highlight the row
          setNewOfferId(transformedOffer.key);
          // Set a timeout to remove the highlight after 2 seconds
          setTimeout(() => {
            setNewOfferId(null);
          }, 2000);
        });
    };
  
    subscribeToEvents();

    // Cleanup function to unsubscribe from events
    return () => {
      if (subscriptionRef.current) {
        // Perform cleanup here, such as unsubscribing from the event
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [ethExplorer]); // Dependency array includes ethExplorer


  // Fetch offer details from the smart contract
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offerDetails = await ethExplorer.getAllOfferDetails();
        // Transform the offer details to match the expected data structure
        let transformedData = [];

        //console.log('offerDetails: ', offerDetails);
        

        for (const offer of offerDetails) {
          // Convert the energy amount and price per energy amount to BigInt        
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
    { key: 'account', text: 'Account', value: 'account' },
    { key: 'amount', text: 'Amount', value: 'amount' },
    { key: 'pricePerUnit', text: 'Price per Unit', value: 'pricePerUnit' },
    { key: 'validUntil', text: 'Valid Until', value: 'validUntil' },
    { key: 'totalPrice', text: 'Total Price', value: 'totalPrice' },
  ];
  

  // Function to handle checkbox change
  const handleCheckboxChange = (offer, checked) => {
    setSelectedItems((prevSelectedItems) => {
      if (checked) {
        return [...prevSelectedItems, offer];
      } else {
        return prevSelectedItems.filter((item) => item.key !== offer.key);
      }
    });
  };

  // Filter data based on search query and selected column
  const filteredData = searchQuery.length > 0 ? data.filter(item => {
    const itemValue = item[searchColumn]?.toString().toLowerCase() || '';
    return itemValue.includes(searchQuery.toLowerCase());
  }) : data;

  const handleBuyClick = () => {
    // Pass the selected items to the context
    setSelectedOrders(selectedItems);
    console.log('Selected items to buy:', selectedOrders);
    router.push('/buy');    
    
  };


  // ui elements
  const { Header, Row, HeaderCell, Body, Cell } = Table;

  return (
    
  <div style={{overflowX : 'auto'}}>
     <style>{flashAnimation}</style>
      <Segment style={{ marginBottom: '200px', minHeight: '50vh'}}>
        <Header as="h2">Energy Market</Header>
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
          {filteredData.map((item) => (
            <Table.Row 
              key={item.key}
              className={item.key === newOfferId ? 'highlight-row' : ''}
            >
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>{item.account}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>{item.pricePerUnit}</Table.Cell>
              <Table.Cell>{item.validUntil}</Table.Cell>
              <Table.Cell>{item.totalPrice}</Table.Cell>
              {isBuyPage ? (
                <Table.Cell>
                  <Checkbox
                    checked={selectedItems.some((selectedItem) => selectedItem.key === item.key)}
                    onChange={(e, { checked }) => handleCheckboxChange(item, checked)}
                  />
                </Table.Cell>
      ) : null}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Grid>
        <Grid.Row>
      <Grid.Column width={16} textAlign="center">
      {isBuyPage ? (       
        <Button primary  onClick={handleBuyClick}>Add to Cart </Button>        
      ) : null}
      </Grid.Column>
      </Grid.Row>
      </Grid>
      </Segment>	
    </div>
  );
  
};


export default Market;
