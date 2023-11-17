"use client";

import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';


import Link from 'next/link';

import  { signIn }  from "next-auth/react";




const LoginPage = () => {


    const [loginData, setLoginData] = useState( {
            email : "",
            password : ""
        });


    const [alert, setAlert] = useState({
            status: "message",
            message : ""
        });
    


    // set event handlers
    const onChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        });
    };
    

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
        
    }
    
    return (
      
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="primary" textAlign="center">
                <Icon name='plug' /> Log-in to your account
              </Header>
              <Form size="large" onSubmit={onSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    type="email"
                    value={loginData.email}                    
                    onChange={onChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={loginData.password}
                    onChange={onChange}
                  />
                  <Button primary fluid size="large" type="submit">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Segment>
                Not registered?  <Link href="/register">Register</Link>
              </Segment>
            </Grid.Column>
          </Grid>
      
    );
  }
  


export default LoginPage;
