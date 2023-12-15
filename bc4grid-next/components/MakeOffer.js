"use client";
import React, { useState } from 'react';

import Offers from '@/components/Offers';

import { 
    Form,   
    Button,   
    Message,  
    Modal
} from 'semantic-ui-react';


// ethExplorer
const MakeOffer = ({ isEdit, trigger, onCreateOffer }) => {
    // state   
    const [energyAmount, setEnergyAmount] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [pricePerEnergyAmount, setPricePerEnergyAmount] = useState('');
    const [showAlert, setShowAlert] = useState(false);  
  
    // UI controls
    const [open, setOpen] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      //console.log('Values: ', energyAmount, validUntil, pricePerEnergyAmount);
  
      const validateOffer = (...values) => {
          return values.every(value => value !== '');
      };
  
      if (!validateOffer(energyAmount, validUntil, pricePerEnergyAmount)) {
        setShowAlert(true);
      }
      else {
        setShowAlert(false);
        onCreateOffer(energyAmount, validUntil, pricePerEnergyAmount);
  
        // close modal
        setOpen(false);
      }    
    };

    // MakeOffer component


  return (
    <>
      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={ trigger }
    >
      <Modal.Header>{isEdit ? 'Edit Offer' : 'Create a new offer'}</Modal.Header>
      <Modal.Content>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Energy Amount</label>
          <input
            placeholder='Energy Amount'
            value={energyAmount}
            onChange={(e) => setEnergyAmount(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Valid Until</label>
          <input
            type="datetime-local"
            placeholder='Valid Until'
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Price Per Energy Amount (in Wei)</label>
          <input
            placeholder='Price Per Energy Amount'
            value={pricePerEnergyAmount}
            onChange={(e) => setPricePerEnergyAmount(e.target.value)}
          />
        </Form.Field>
        <div style={{ textAlign: 'center' }}>
        {showAlert ? (
        <Message
          negative
          header="Please fill in all fields"
          onDismiss={() => setShowAlert(false)}
        />
      ) : (
    <Button primary type="submit" style={{marginTop:'10px'}} >{isEdit ? 'Edit Offer' : 'Create offer'}</Button>
      )}   
      </div>
      </Form> 
      </Modal.Content>
    </Modal> 
    </>
  );
};


export default MakeOffer;
