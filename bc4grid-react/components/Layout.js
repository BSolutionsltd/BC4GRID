import React from 'react';
import MenuBar from './MenuBar';
import Header from './Header';
import BalanceInfo from './Balance';

// semantic ui
import { Container }  from 'semantic-ui-react';

import Head from 'next/head'; // adds everything into a header from <Head>

const Layout = (props) => {
    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>
            <Header />
            <MenuBar />
            <BalanceInfo balanceKwh="100 kWh" price="$50.00" />

            {props.children}
            
        </Container>
    )
}

export default Layout;