import React, { Component } from 'react';

// semantic-ui
import {Login} from '../components/Account';

class LogPage extends Component {

  // API call /user/meters
  users = [
    { name: 'Bob', password: 'abcd1234' },
    { name: 'Alice', password: 'abcd1234' },    
  ];



  render() {
    return (      
      <Login />      
      
    );
  }
}

export default LogPage;
