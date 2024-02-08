"use client";

import React, { useEffect, useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import Link from 'next/link';
import validateEmail from '@/lib/utils';

// next-auth 
import { signIn } from "next-auth/react";
import { getSession } from 'next-auth/react';

import { useRouter } from 'next/navigation'; // Import useRouter


const LoginPage = () => {
    const router = useRouter();

    const [loginData, setLoginData] = useState( {
            email : "",
            password : ""
        });
    const [alert, setAlert] = useState({
            status: "message",
            message : ""
        });

   

    // check if user is already registered
    useEffect(() => {
      const checkUserRegistered = async () => {
          const session = await getSession();
          //console.log('Session status: ', session);
          if (session) {
              router.push('/');
          }
      };
      checkUserRegistered();
  }, [router]); // Added router to the dependency array



    // validate email
    // validate email and password
    useEffect(() => {
      const validate = () => {
          let emailIsValid = validateEmail(loginData.email);
          if (!emailIsValid) {
              setAlert({
                  status: "error",
                  message: "Please enter a valid email address"
              });
              return false;
          }
          if (loginData.password.length < 6) {
              setAlert({
                  status: "error",
                  message: "Password length should be more than 6 characters"
              });
              return false;
          }
          return true;
      };

      if (loginData.email && loginData.password) {
          validate();
      }
  }, [loginData.email, loginData.password]); // Correct dependency array

    // set event handlers
    const onChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        });
    };
    

    const onSubmit = async (e) => {
        e.preventDefault();

        const {email, password} = loginData;

        let response = await signIn("credentials",{
            email,
            password,
            callbackUrl:  '/dashboard',
            redirect: true
          }
        );

        if (response?.ok) {
            //console.log('success');    
            //router.push('/dashboard'); // Redirect to the trading page        
        }
        else {
            setAlert({
                status: "error",
                message: response?.error
            });
        }
        return response;
        
    }
    
    return (
      
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="primary" textAlign="center">
                Log-in to your account
              </Header>
              <Form size="large" onSubmit={onSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    type="email"
                    name = "email"
                    value={loginData.email}                    
                    onChange={onChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={onChange}
                  />
                  <Button primary fluid size="large" type="submit">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Segment>
                Not registered?  <Link href="/auth/register">Register</Link>
              </Segment>
            </Grid.Column>
          </Grid>
      
    );
  }
  


export default LoginPage;
