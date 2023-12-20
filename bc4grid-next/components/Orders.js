"use client";
import localforage from 'localforage';

import React, { useState, useEffect } from "react";

import { 
  Table, 
  Segment, 
  Input, 
  Dropdown,
  Grid,
  Button } from "semantic-ui-react";

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';



const Orders = ({orders}) => {


    
  // use ethExplorer
  const { ethExplorer, setEthExplorer } = useEthExplorer();
  const [error, setError] = useState(null);  
 
  // market data
  const [data, setData] = useState([]);
    
    
  // search state
  const [searchColumn, setSearchColumn] = useState('totalPrice'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');

  // filter state
  // sorting data
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const clearLocalForage = async () => {
    try {
      await localforage.clear();
      console.log('Cleared localforage');

      setData([]);
    } catch (error) {
      console.error('Error clearing localforage:', error);
    }
  };

  

// Fetch offer details from the smart contract
useEffect(() => {
  // This function runs when the component mounts
  const fetchOrders = async () => {
    try {
      const finalizedOrders = await localforage.getItem('finalizedOrders') || [];
      setData(finalizedOrders);
      console.log('Data from local storage: ', data);
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };
  fetchOrders();
 
}, []);

  // This useEffect hook runs whenever the data state variable changes
  useEffect(() => {
    const updateOrders = async () => {
      try {
        // Retrieve the current data
        const currentData = await localforage.getItem('finalizedOrders') || [];
    
        // Get the ids of the current data
        const currentDataIds = currentData.map(order => order.key);
    
        // Filter out the new orders that are already included in the current data
        const newOrders = orders.filter((order) => !currentDataIds.includes(order.key));
    
        // Combine the current data with the new orders
        const updatedData = [...currentData, ...newOrders];
    
        // Save the updated data back to localforage
        await localforage.setItem('finalizedOrders', updatedData);
    
        // Set the data state variable with the updated data
        setData(updatedData);
    
        console.log('Updated orders: ', updatedData);
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    };
    
    updateOrders();
  }, [orders]);


   
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


    // sort filtered data
    const onSort = (newSortColumn) => {
      if (sortColumn === newSortColumn && sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('asc');
      }
    };
    
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
    
  <div style={{overflowX : 'auto'}}>
      <Segment style={{ marginBottom: '200px', minHeight: '50vh'}}>
        <Header as="h2">Your Orders</Header>
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
    /> <Button icon='trash' onClick={clearLocalForage} />    
        </Grid.Column>
        </Grid.Row>
        </Grid>
      <Table celled compact>
        <Table.Header>
          <Table.Row>
        <Table.HeaderCell
          onClick={() => onSort('key')}
        >
          ID {sortColumn === 'key' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => onSort('account')}
        >
          Seller {sortColumn === 'account' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => onSort('amount')}
        >
          Amount {sortColumn === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => onSort('pricePerUnit')}
        >
          Price per unit {sortColumn === 'pricePerUnit' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => onSort('validUntil')}
        >
          Valid until {sortColumn === 'validUntil' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => onSort('Total Price')}
        >
          Valid until {sortColumn === 'totalPrice' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Table.HeaderCell>        
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map((item, index) => (
            <Table.Row key={item.key}>
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>{item.account}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>{item.pricePerUnit}</Table.Cell>
              <Table.Cell>{new Date(item.validUntil).toLocaleString()}</Table.Cell>
              <Table.Cell>{item.totalPrice}</Table.Cell>             
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
     
      </Segment>	
    </div>
  );
  
};


export default Orders;
