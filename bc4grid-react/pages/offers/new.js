import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';

// web3 interface
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

// dynamic routing
import {Router} from '../../routes';


class CampaignNew extends Component {
    state = {
        minimumContribution : '',
        errorMessage  : '',
        loading: false
    };

    onSubmit = async (event) => {
        // stop default submit
        event.preventDefault();

        this.setState({loading : true, errorMessage : ''}); // set loading animation
        
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                    .createCampaign(this.state.minimumContribution)                
                    .send({from: accounts[0]}); // using metamask we don't have to specify gas

            // send to main page
            Router.pushRoute('/');
        }
        catch (err) {
            this.setState({errorMessage :  err.message });
        }
        
        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Create an offer!</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Price offer</label>
                    <Input 
                        label="wei"  
                        labelPosition='right'
                        value = {this.state.minimumContribution}
                        onChange={event => {
                            this.setState({minimumContribution : event.target.value})                             
                        }}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}>
                </Message>

                <Button loading = {this.state.loading} primary>Create!</Button>
            </Form>
            </Layout>
        );
    }
}

export default CampaignNew;