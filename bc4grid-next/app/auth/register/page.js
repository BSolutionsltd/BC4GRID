"use client";

import { useState } from 'react';


import React from 'react';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';



const Register = () => {

    const [registerData, setRegisterData] = useState({
        name : '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name] : e.target.value
        });
    };
    
    
    const onSubmit = (e) => {
        return null;
        
    }

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
                      name="fullName"
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
              </Grid.Column>
            </Grid>
          
        </>
      );
};




export default Register;
