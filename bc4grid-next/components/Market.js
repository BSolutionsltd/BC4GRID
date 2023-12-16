"use client";

import React, { useState, useEffect, useRef } from "react";
import web3 from "web3";

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';
import { useSelectedOrders } from '@/app/(trading)/context/OrdersContext';

import { 
  Table, 
  Segment, 
  Checkbox, 
  Input, 
  Button, 
  Dropdown,
  Icon, 
  Grid } from "semantic-ui-react";

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

  // filtering
  // Add these state variables for sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Add this function to handle sorting
  const onSort = (column) => {
    if (sortColumn === column) {
      // If the current sort column is clicked again, reverse the sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different sort column is clicked, set the sort column and default the direction to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };


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


  // Function to handle buy button click
  const handleBuyClick = () => {
    // Pass the selected items to the context
    setSelectedOrders(selectedItems);
    console.log('Selected items to buy:', selectedOrders);
    router.push('/buy');    
    
  };


  // filtering
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
  
      if (sortDirection === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
    return 0;
  });


  // ui elements
  const { Header } = Table;

  return (
    
  <div>
     <style>{flashAnimation}</style>
      <Segment style={{ marginBottom: '200px', minHeight: '50vh'}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Header as="h2">Energy Market</Header>
        {isBuyPage ? 
        <Button primary title='Add to cart' size='medium' animated='vertical' onClick={handleBuyClick}>
        <Button.Content hidden>Buy</Button.Content>
        <Button.Content visible>
          <Icon name='add to cart' />
        </Button.Content>
      </Button>        
        : null}
      </div>
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
      <Table basic='very' compact='very' fixed selectable sortable>
        <Table.Header>
        <Table.Row>
    <Table.HeaderCell width={1} onClick={() => onSort('key')}>
      ID {sortColumn === 'key' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell width={6} onClick={() => onSort('account')}>
      Account {sortColumn === 'account' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell onClick={() => onSort('amount')}>
      Amount {sortColumn === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell onClick={() => onSort('pricePerUnit')}>
      Price per Unit {sortColumn === 'pricePerUnit' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell onClick={() => onSort('validUntil')}>
      Valid Until {sortColumn === 'validUntil' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell onClick={() => onSort('totalPrice')}>
      Total Price {sortColumn === 'totalPrice' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    {isBuyPage ? (
  <Table.HeaderCell>Select</Table.HeaderCell>
    ) : null}
  </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map((item) => (
            <Table.Row 
              key={item.key}
              className={item.key === newOfferId ? 'highlight-row' : ''}
            >
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>{item.account}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>{item.pricePerUnit}</Table.Cell>
              <Table.Cell>{new Date(item.validUntil).toLocaleString()}</Table.Cell>
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
      
      </Segment>	
    </div>
  );
  
};


export default Market;
