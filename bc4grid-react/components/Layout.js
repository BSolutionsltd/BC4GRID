import React, { Component }  from 'react';
import TradeMenu from './TradeMenu';
import Header from './Header';
import BalanceInfo from './Balance';

// semantic ui
import { Container }  from 'semantic-ui-react';

import Head from 'next/head'; // adds everything into a header from <Head>

class Layout extends Component {

    state = {
      accounts: [],
      balance: ''  
    };

    static async getInitialProps(props) {
        const accounts = await web3.eth.getAccounts();    
        console.log(accounts[0]); 
        const balance = await web3.eth.getbalance(accounts[0]);

                
        return { accounts, balance }; // Return accounts as an object
      }

render(){

    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>
            <Header />
            <TradeMenu />
            <BalanceInfo balanceKwh="4kWh" price="$50.00" />

            {this.props.children}
            
        </Container>
    )
}
}

export default Layout;