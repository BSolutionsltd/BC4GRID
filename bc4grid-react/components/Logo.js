import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import Link from 'next/link';

const Logo = () => {
  return (    
    <Link href="/">
      <a>
        <Header as='h2' style={{ cursor: 'pointer' }}>
          <Icon name='plug'/>
          <Header.Content>BC4GRID</Header.Content>
        </Header>
      </a>
    </Link>
  );
}

export default Logo;
