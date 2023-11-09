import React, { Component } from 'react';
import {Profile} from '../components/Account';

// semantic-ui

class ProfilePage extends Component {

  // API call /user/meters

  render() {
    return (      
      <Profile user={{
            avatar: 'images/avatar/person.png',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1123456789',
            joinedYear: 2020,
            transactions: 100
        }} />      
    );
  }
}

export default ProfilePage;
