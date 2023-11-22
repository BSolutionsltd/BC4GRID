"use client";

import React, { useState, useEffect  }  from 'react';
import { useSession } from 'next-auth/react';

// semantic-ui
import { Card, Image, Form, Button, Grid } from 'semantic-ui-react';

const Profile = () => {
  const { data: session } = useSession();

  const [profileData, setProfileData] = useState({
    image: '/images/avatar/person.png',
    name: 'Ivana',
    email: '',
    phone: '',
    joinedYear: '',
    transactions: 0,
  }); 
  

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/auth/profile?id=${session.user.id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          setProfileData({ ...data.profile });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [session?.user?.id]);
  
 

  

  return (
    
    <>

      <Grid stackable columns={2} relaxed>
        <Grid.Column width={6}>
          <Card fluid> 
            <Image src={profileData.image} wrapped ui={false} />
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


