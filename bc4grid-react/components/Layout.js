import React from 'react';
import MenuBar from './MenuBar';
import Header from './Header';

// semantic ui
import { Container, Grid, }  from 'semantic-ui-react';

import Head from 'next/head'; // adds everything into a header from <Head>

const Layout = (props) => {
    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>
            <Header />
            <MenuBar />
            
            {props.children}
            
        </Container>
    )
}

export default Layout;