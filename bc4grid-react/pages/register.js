import React, { Component } from 'react';

// semantic-ui
import {Register} from '../components/Account';

class RegisterPage extends Component {

  // API call /user/meters
  users = [
    { name: 'Bob', password: 'abcd1234' },
    { name: 'Alice', password: 'abcd1234' },    
  ];



  render() {
    return (      
      <Register /> 
      
      
    );
  }
}

export default RegisterPage;
