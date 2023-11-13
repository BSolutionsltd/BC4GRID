import React, { Component } from 'react';

import { Login } from '../components/Account'

import { AuthProvider } from '../components/Auth';

// semantic-ui
class LogPage extends Component {

  // API call /user/meters
  users = [
    { name: 'Bob', password: 'abcd1234' },
    { name: 'Alice', password: 'abcd1234' },    
  ];



  render() {
    return (      
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
  }
}

export default LogPage;
