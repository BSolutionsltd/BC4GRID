"use client";
import React, { useState, useEffect } from 'react';

// semantic-ui-react
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

const SignUp = () => {
  const router = useRouter();  
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


    // check if user is already registered
    useEffect(() => {
      const checkUserRegistered = async () => {       
      const session = await getSession();
        console.log('Session status: ', session);
        if (session) {
          router.push('/');
        }
      };
      checkUserRegistered();
    }, []);

    const onChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name] : e.target.value
        });
    };
    
    
    const onSubmit = async (e) => {
      e.preventDefault();

      console.log('payload: ',registerData);

      // client side validation
      if (registerData.password !== registerData.confirmPassword) {
          setAlert({
              status: 'error',
              message: 'Passwords do not match',
          });
          return;
      }
        
      try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/signup`,
              {
                  method: 'POST',
                  body: JSON.stringify(registerData),
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
          );
  
          if (response.ok) {            
              const data = await response.json();              
              setAlert({
                  status: 'success',
                  message: 'Account created successfully',                  
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
                <Message hidden={!alert.status} visible={alert.status} success={alert.status == 'success'} error={alert.status == 'error'} >
                {alert.message}
              </Message>                
              </Grid.Column>
            </Grid>     
        </>
      );
};

export default SignUp;
