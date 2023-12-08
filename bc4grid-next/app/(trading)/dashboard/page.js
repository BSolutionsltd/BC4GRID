"use client";

import React, { Component } from 'react';


// semantic-ui
import SmartMeters from '@/components/SmartMeters';
import Balance from '@/components/Balance';

class Dashboard extends Component {

  // API call /user/meters
  meters = [
    { 
      name: 'Smart Meter ', 
      description: 'Description for Smart Meter' ,
      SN : '123456789',
      energy: 123,
      tokens: 1300,
      update: '01/10/2022'
    }        
  ];



  render() {
    return (    
      <>  
      <Balance />
       <SmartMeters meters={ this.meters }/>
      </>
      
    );
  }
}

export default Dashboard;
