import React, { useState, useEffect } from 'react';
import TradeMenu from './TradeMenu';
import Header from './Header';
import Footer from './Footer';
import BalanceInfo from './Account/Balance';
import web3 from '../ethereum/web3';

// semantic ui
import { Container }  from 'semantic-ui-react';

import Head from 'next/head'; // adds everything into a header from <Head>


const App = ( { isIndexPage, children } ) => {

    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            const accounts = await web3.eth.getAccounts();            
            const balance = await web3.eth.getBalance(accounts[0]);
            setAccounts(accounts);
            setBalance(balance);
        }
        fetchAccounts();
    }, []);

    return (

        <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>
            <Header />
            {!isIndexPage ? (
                <>
                    <TradeMenu />
                    <BalanceInfo balanceKwh={accounts} price="$50.00" />
                </>
            ) : null}

            {children}          
             
        </Container>
    )
}

export default App;
