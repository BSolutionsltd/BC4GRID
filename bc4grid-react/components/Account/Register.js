import React, { Component } from 'react';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Layout from './Layout';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleRegister = () => {
    // Implement your registration logic here
    // For this example, we'll just log the state to the console
    console.log(this.state);
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <Layout>
          <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="primary" textAlign="center">
                <Icon name='plug' /> Register for an account
              </Header>
              <Form size="large" onSubmit={this.handleRegister}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone Number"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                  <Button primary fluid size="large" type="submit">
                    Register
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Layout>
      </div>
    );
  }
}

export default Register;
