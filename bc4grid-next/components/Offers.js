"use client";
import React, { useState, useEffect, useReducer } from "react";

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
import useEventSubscription from "@/app/web3/subscriptions/eventSubscription";

import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';



const Offers = (  ) => {  
  // style
  const highlightAnimation = `
      @keyframes addOfferAnimation {
        0% { background-color: #0E6EB8; }
        100% { background-color: transparent; }
      }   

      @keyframes closeOfferAnimation {
        0% { background-color: #B03060; }
        100% { background-color: transparent; }
      }

      @keyframes modifyOfferAnimation {
        0% { background-color: #008080; }
        100% { background-color: transparent; }
      }

      .new-offer {
        animation: addOfferAnimation 2s; /* Run the animation for 6 seconds */
      }

      .modified-offer {
        animation: modifyOfferAnimation 2s; /* Run the animation for 6 seconds */
      }

      .removed-offer {
        animation: closeOfferAnimation 2s; /* Run the animation for 6 seconds */
      }
    `;

  // use ethExplorer
  const { ethExplorer, setEthExplorer } = useEthExplorer();  
  const [error, setError] = useState(null);  
 
  // market data
  //const [data, setData] = useState([]);
  // selected items from market

  // offer status
  const [offerStatus, setOfferStatus] = useState({});  

    // edit offer
    const [open, setOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
  
  // states for added and removed offers
  const [newOfferId, setNewOfferId] = useState(null);
  const [modifiedOfferId, setModifiedOfferId] = useState(null);
  const [removedOfferIds, setRemovedOfferIds] = useState([]);
  
  // state reducer
  const offerReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_OFFER':
        return state.some((offer) => offer.key === action.offer.key) 
          ? state 
          : [...state, action.offer];
      case 'DELETE_OFFER':
        return state.filter((offer) => offer.key !== action.key);
      case 'MODIFY_OFFER':
        return state.map((offer) => 
          offer.key === action.offer.key ? action.offer : offer
        );        
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };    

  // data to maintain
  const [data, dispatch] = useReducer(offerReducer, []);

  // loading state
  const [loading, setLoading] = useState([]);
  
  // search state
  const [searchColumn, setSearchColumn] = useState('totalPrice'); // Default search column
  const [searchQuery, setSearchQuery] = useState('');    

  // sorting data
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

    // handle data
    const transformAndFilterData = (offer) => {
    
      return {
        key: Number(offer.id),
        account: web3.utils.toChecksumAddress(offer.seller),
        amount: Number(offer.energyAmount),
        pricePerUnit: Number(offer.pricePerEnergyAmount),
        validUntil: new Date(Number(offer.validUntil) * 1000).toLocaleString(),
        totalPrice: Number(offer.energyAmount) * Number(offer.pricePerEnergyAmount),
      };
    };


    useEventSubscription('OfferCreated', (event) => {
      const newOffer = event.returnValues;
      const transformedOffer = transformAndFilterData(newOffer);
      // Update the state with the new offer after transforming and filtering
      // Dispatch an action to add the new offer
      dispatch({ type: 'ADD_OFFER', offer: transformedOffer });
       // Add the new offer ID to the array
       // Update the offerStatuses state to indicate that this offer was added
       setOfferStatus((prevStatus) => ({
         ...prevStatus,
         [transformedOffer.key]: 'added',
       }));
     
       // After 2 seconds, remove the offer's ID from offerStatuses
       setTimeout(() => {
         setOfferStatus((prevStatus) => {
           const { [transformedOffer.key]: _, ...rest } = prevStatus;
           return rest;
         });
       }, 2000);
     });
  
  useEventSubscription('OfferClosed', (event) => {
    const closedOffer = event.returnValues;
    const transformedOffer = transformAndFilterData(closedOffer);
  
    // Update the offerStatuses state to indicate that this offer was closed
    setOfferStatus((prevStatus) => ({
      ...prevStatus,
      [transformedOffer.key]: 'deleted',
    }));
  
    setTimeout(() => {
      dispatch({ type: 'DELETE_OFFER', key: transformedOffer.key });
      setOfferStatus((prevStatus) => {
        const { [transformedOffer.key]: _, ...rest } = prevStatus;
        return rest;
      });
    }, 2000);
  });

  useEventSubscription('OfferModified', (event) => {
    const modifiedOffer = event.returnValues;
  
    console.log('Modified offer: ', modifiedOffer);
  
    const transformedOffer = transformAndFilterData(modifiedOffer);
  
    // Dispatch an action to modify the offer
    dispatch({ type: 'MODIFY_OFFER', offer: transformedOffer });
  
    // Update the offerStatuses state to indicate that this offer was modified
    setOfferStatus((prevStatus) => ({
      ...prevStatus,
      [transformedOffer.key]: 'modified',
    }));
  
    // After 2 seconds, remove the offer's ID from offerStatuses
    setTimeout(() => {
      setOfferStatus((prevStatus) => {
        const { [transformedOffer.key]: _, ...rest } = prevStatus;
        return rest;
      });
    }, 2000);
  });


  // handlers
  const handleEditClick = (offer) => {
    setSelectedOffer(offer);
    setLoading(prevLoading => ({ ...prevLoading, [offer.key]: true }));
    setOpen(true);
  };

  const handleUpdateOffer = async (event) => {
    event.preventDefault();        
    // Close the modal
    setOpen(false);

    console.log('selectedOffer: ', selectedOffer);

    const response = await ethExplorer.modifyOffer(
      selectedOffer.key,
      Math.floor(new Date(selectedOffer.validUntil).getTime() / 1000),      
      selectedOffer.pricePerUnit, 
      selectedOffer.amount
      );

      dispatch({ type: 'MODIFY_OFFER', offer: selectedOffer });

    if (response.receipt) {      
      setLoading(prevLoading => ({ ...prevLoading, [selectedOffer.key]: false }));      
      
      }

    if (response.error) {
      console.error('Error: ', response.error);
    }
    
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setOpen(false);
  }

  const handleDeleteClick = async (offerId) => {
    setLoading(prevLoading => ({ ...prevLoading, [offerId]: true }));
    // Filter out the offer with the specified key
    const response = await ethExplorer.cancelOffer(offerId);

    if (response.receipt) {      
      setLoading(prevLoading => ({ ...prevLoading, [offerId]: false }));
      }

    if (response.error) {
      console.error('Error: ', response.error);
    }
  };

  
       

  
  // Fetch offer details from the smart contract
useEffect(() => {
  const fetchOffers = async () => {
    try {
      const offers = await ethExplorer.getAllOfferDetails();
      const fetchedAccount = await ethExplorer.getUserAccount();      
      // Transform the offer details to match the expected data structure
      
      for (const offer of offers) {
        // Convert the energy amount and price per energy amount to BigInt        
        const newOffer = {
          key: Number(offer.offerId),
          account: web3.utils.toChecksumAddress(offer.sellerAddress),
          amount: Number(offer.energyAmount),
          pricePerUnit: Number(offer.pricePerEnergyAmount),
          validUntil: new Date(Number(offer.validUntil) * 1000).toLocaleString(),
          totalPrice: Number(offer.energyAmount) * Number(offer.pricePerEnergyAmount),
        };

        if (newOffer.account === fetchedAccount) {
          dispatch({ type: 'ADD_OFFER', offer: newOffer });  
        }        
    }      
      
    } catch (error) {
      console.error('Error fetching offer details:', error);
    }
  };
  fetchOffers();
}, []);
  
  
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
   const { Header  } = Table;

   const options = [
     { key: 'edit', icon: 'edit', text: 'Edit', value: 'edit' },
     { key: 'cancel', icon: 'cancel', text: 'cancel', value: 'cancel' }
     
   ]

  return (
    
  <div>
     <style>{highlightAnimation}</style>
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
      <Table  sortable compact selectable>
        <Table.Header>
        <Table.Row>
    <Table.HeaderCell
      onClick={() => onSort('key')}
    >
      ID {sortColumn === 'key' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell
      onClick={() => onSort('amount')}
    >
      Amount {sortColumn === 'amount' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell
      onClick={() => onSort('pricePerUnit')}
    >
      Price per Unit {sortColumn === 'pricePerUnit' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell
      onClick={() => onSort('validUntil')}
    >
      Valid Until {sortColumn === 'validUntil' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell
      onClick={() => onSort('totalPrice')}
    >
      Total Price {sortColumn === 'totalPrice' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </Table.HeaderCell>
    <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
  </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map((item, index) => (
            <Table.Row 
            key={item.key}
            className={
              offerStatus[item.key] === 'added' ? 'new-offer' :
              offerStatus[item.key] === 'deleted' ? 'removed-offer' :
              offerStatus[item.key] === 'modified' ? 'modified-offer' :
              ''
            }
          >
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>{item.pricePerUnit}</Table.Cell>
              <Table.Cell>{new Date(item.validUntil).toLocaleString()}</Table.Cell>
              <Table.Cell>{item.totalPrice}</Table.Cell>    
              <Button.Group basic>              
              <Modal
                  open={open}                  
                  onClose={handleCloseModal}
                  trigger={
                    <Button                    
                    title='edit offer' 
                    icon='edit'                     
                    onClick={() => handleEditClick(item)} 
                    loading={loading[item.key]}
                    />
                  }
                    
                >
              <Modal.Header>Update Offer</Modal.Header>
              <Modal.Content>
                <Form onSubmit={handleUpdateOffer} >
                <Form.Field>
                  <label>ID</label>
                  <input placeholder='ID' value={selectedOffer?.key} disabled />
                </Form.Field>
                <Form.Field>
                  <label>Amount</label>
                  <input 
                  placeholder='Amount' 
                  value={selectedOffer?.amount} 
                  onChange={(e) => setSelectedOffer({...selectedOffer, amount: e.target.value})} />
                </Form.Field>
                <Form.Field>
                  <label>Price Per Unit</label>
                  <input 
                  placeholder='Price Per Unit' 
                  value={selectedOffer?.pricePerUnit} 
                  onChange={(e) => setSelectedOffer({...selectedOffer, pricePerUnit: e.target.value})} />
                </Form.Field>
                <Form.Field>
                  <label>Valid Until</label>
                  <input 
                  type='datetime-local' 
                  placeholder='Valid Until' 
                  value={selectedOffer?.validUntil} 
                  onChange={(e) => setSelectedOffer({...selectedOffer, validUntil: e.target.value})} />
                </Form.Field>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type='submit' primary>Submit</Button>
                </div>
                  
                </Form>
              </Modal.Content>
            </Modal> 
              <Button 
                icon='delete' 
                title='delete offer'                
                loading={loading[item.key]} 
                onClick={() => handleDeleteClick(item.key)} 
                />
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
