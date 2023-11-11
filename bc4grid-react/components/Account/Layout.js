import React, { Component }  from 'react';

// semantic ui
import { Container }  from 'semantic-ui-react';

import Head from 'next/head'; // adds everything into a header from <Head>

class Layout extends Component {

    
render(){

    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
            </Head>            
            {this.props.children}
            
        </Container>
    )
}
}

export default Layout;