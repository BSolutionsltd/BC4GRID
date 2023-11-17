"use client";

import React, { Component } from 'react';


// semantic-ui
import SmartMeters from '@/components/SmartMeters';

class Dashboard extends Component {

  // API call /user/meters
  meters = [
    { name: 'Smart Meter 1', description: 'Description for Smart Meter 1' },
    { name: 'Smart Meter 2', description: 'Description for Smart Meter 2' },    
  ];



  render() {
    return (      
      
       <SmartMeters meters={ this.meters }/>
      
    );
  }
}

export default Dashboard;
