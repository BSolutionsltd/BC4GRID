"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// semantic-ui
import { 
  Card, 
  Image, 
  Form, 
  Button, 
  Grid, 
  Header, 
  Message } from 'semantic-ui-react';

const Profile = () => {
  const { data: session } = useSession();

  const [profileData, setProfileData] = useState({});
  // if successfull update
  const [submitSuccess, setSubmitSuccess] = useState(false);


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
          console.log('profile data:', data);
          setProfileData({ ...data.profile });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [session?.user?.id]);

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // You would typically upload the image to the server here
    // and then set the image URL in the profileData state.
    // For demonstration, we'll use a local blob URL.
    const imageUrl = URL.createObjectURL(file);
    setProfileData({ ...profileData, image: imageUrl });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send a PUT request to the server with the updated profile data
    fetch(`/api/auth/profile?id=${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
      .then(response => {
        if (response.ok) {
          setSubmitSuccess(true);
          // Set submitSuccess back to false after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('Updated profile data:', data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <>
    <Header as="h1">User profile</Header>
      <Grid stackable columns={2} relaxed>
        <Grid.Column width={6}>
          <Card fluid>
            <Image src={profileData.image} wrapped ui={false} alt=''/>
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
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input placeholder={profileData.name} name="name" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <input placeholder={profileData.email} name="email" onChange={handleChange}  />
            </Form.Field>
            <Form.Field>
              <label>password</label>
              <input type="password" placeholder="********" name="password" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Smart Meter Serial Number</label>
              <input placeholder={profileData.smartMeterSN} name="smartMeterSN" onChange={handleChange} />
            </Form.Field>            
            <Form.Field>
              <label>Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Field>
            <Button type='submit'>Update</Button>
          </Form>
          {submitSuccess && (
            <Message
              success
              header='Profile Update'
              content='Your profile has been updated successfully.'
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Profile;
