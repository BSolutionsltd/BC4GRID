"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// semantic-ui
import { Card, Image, Form, Button, Grid } from 'semantic-ui-react';

const Profile = () => {
  const { data: session } = useSession();

  const [profileData, setProfileData] = useState({
    image: '',
    name: '',
    email: '',
    phone: '',
    joinedYear: '',
    transactions: 0,
    smartMeterAddress: '', // Added smart meter address
    privateKey: '', // Added private key
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
    // Here you would send the updated profile data to the server
    console.log('Updated profile data:', profileData);
  };

  // Function to handle form field changes
  const handleChange = (e, { name, value }) => {
    setProfileData({ ...profileData, [name]: value });
  };

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
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Full Name</label>
              <input placeholder={profileData.name} name="name" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <input placeholder={profileData.email} name="email" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input placeholder={profileData.phone} name="phone" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Smart Meter Address</label>
              <input placeholder='Smart Meter Address' name="smartMeterAddress" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Private Key</label>
              <input placeholder='Private Key' name="privateKey" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Field>
            <Button type='submit'>Update</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Profile;
