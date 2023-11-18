"use client";

import React, { useState  }  from 'react';

// semantic-ui

import { Card, Image, Form, Button, Grid } from 'semantic-ui-react';

const Profile = () => {

  const [profileData, setProfileData] = useState({
    
      avatar: '/images/avatar/person.png',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1123456789',
      joinedYear: 2020,
      transactions: 100
  
  })

  return (
    
    <>
      <Grid stackable columns={2} relaxed>
        <Grid.Column width={6}>
          <Card fluid> 
            <Image src={profileData.avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{profileData.name}</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in {profileData.joinedYear}</span>
              </Card.Meta>
              <Card.Description>
                {profileData.name} is a blockchain user in the smart-grid industry.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <i className='user icon' />
                {profileData.transactions} Transactions
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={10}>
          <Form>
            <Form.Field>
              <label>Full Name</label>
              <input placeholder={profileData.name} />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <input placeholder={profileData.email} />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input placeholder={profileData.phone} />
            </Form.Field>
            <Button type='submit'>Update</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Profile;


