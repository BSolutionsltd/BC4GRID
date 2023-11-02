import React, { Component } from 'react';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import LayoutLogin from '../components/LayoutLogin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    // Implement your authentication logic here
    // For this example, we'll just log the email and password to the console
    console.log('Email:', this.state.email);
    console.log('Password:', this.state.password);
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        <LayoutLogin>
      <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="primary" textAlign="center">
          <Icon name='plug' /> Log-in to your account
          </Header>
          <Form size="large" onSubmit={this.handleLogin}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <Button color="teal" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      </LayoutLogin >
      </div>
    );
  }
}

export default Login;
