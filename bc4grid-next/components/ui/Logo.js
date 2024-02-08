import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import Link from 'next/link';

const Logo = () => {
  return (    
    <Link href="/">
      <Header as='h1' style={{ cursor: 'pointer' }}>
        <Image src={'images/logo/logo.svg'} avatar />
        <Header.Content>
          <span style={{ color: 'black' }}>BC4</span>
          <span style={{ color: '#1678c2' }}>GRID</span>
        </Header.Content>
      </Header>
    </Link>
  );
}

export default Logo;