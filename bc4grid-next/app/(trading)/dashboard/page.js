"use client";

import React, { Component } from 'react';


// semantic-ui
import SmartMeter from '@/components/SmartMeter';
import Balance from '@/components/Balance';

class Dashboard extends Component {

  render() {
    return (    
      <>  
      <Balance />
       <SmartMeter />
      </>
      
    );
  }
}

export default Dashboard;
