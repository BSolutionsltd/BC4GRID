import React from 'react';
import MenuBar from './MenuBar';
import Logo  from './Logo';
import AccountInfo from './AccountInfo'
import UserMenu    from './UserMenu'
// semantic ui
import { Container, Grid, }  from 'semantic-ui-react';

import Head from 'next/head'; // adds everything into a header from <Head>

const Layout = (props) => {
    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>
            <Grid columns={3} padded='vertically' verticalAlign='top'>
                <Grid.Column width={3}> <Logo /> </Grid.Column> 
                <Grid.Column width={10}>  <AccountInfo /> </Grid.Column>
                <Grid.Column width={3}>  <UserMenu />    </Grid.Column>

                 
            </Grid>
            <MenuBar />
            {props.children}
            
        </Container>
    )
}

export default Layout;