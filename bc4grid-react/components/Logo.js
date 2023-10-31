import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import { Link }   from '../routes';

const Logo = (props) => {

    return (
        <Header as='h2'>
            <Icon name='plug' />
            <Header.Content>BC4GRID</Header.Content>
  </Header>
        
    )

}

export default Logo;