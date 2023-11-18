"use client";

import { useState } from 'react';


import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';



const Register = () => {

    const [registerData, setRegisterData] = useState({
        name : '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    

    const [alert, setAlert] = useState({
        status: "",
        message : ""
    });

    // New state variable to track whether status has been set
    const [statusSet, setStatusSet] = useState(false);

    const onChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name] : e.target.value
        });
    };
    
    
    const onSubmit = async (e) => {
      e.preventDefault();
        
      try {
          const response = await fetch(
              '/api/auth/signup',
              {
                  method: 'POST',
                  body: JSON.stringify(registerData),
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
          );
  
          if (response.ok) {
              setAlert({
                  status: 'success',
                  message: 'Account created successfully',                  
              });

              console.log('status of response: ', response.status);  
              setRegisterData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
              });

              // Set the statusSet to true when the status changes
              setStatusSet(true);
          } else {
              setAlert({
                  status: 'error',
                  message: 'Error creating account',
              });
          }
      } catch (error) {
          console.error({ error });
          setAlert({
              status: 'error',
              message: 'Error creating account',
          });
      }
      
  };
  

    return (
    <>         
            <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="primary" textAlign="center">
                 Register for an account
                </Header>
                <Form size="large" onSubmit={onSubmit}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Full Name"
                      name="name"
                      type="text"
                      value={registerData.name}
                      onChange={onChange}
                    />
                    
                    <Form.Input
                      fluid
                      icon="mail"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="email"
                      type="email"
                      value={registerData.email}
                      onChange={onChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={registerData.password}
                      onChange={onChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={onChange}
                    />
                    <Button primary fluid size="large" type="submit">
                      Register
                    </Button>                
                  </Segment>
                 
                </Form>
                  
                <Message hidden={!alert.status} visible={alert.status} success={alert.status == 'success'} >
                {alert.message}
              </Message>
                
              </Grid.Column>
              
              
            </Grid>
            
            <p>Message: TEST
            Alert: {alert.status}</p>
            
           
         
              
           
            
        </>
      );
};




export default Register;
