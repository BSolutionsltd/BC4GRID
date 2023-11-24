"use client"

import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TradeMenu = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const router = useRouter();

  useEffect(() => {
    // Update activeItem based on the current route
    if (router.pathname === '/dashboard') {
      setActiveItem('Dashboard');
    } else if (router.pathname === '/buy') {
      setActiveItem('Buy');
    } else if (router.pathname === '/sell') {
      setActiveItem('Sell');
    }
  }, [router.pathname]);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu pointing secondary>
      <Link href="/dashboard">
        <Menu.Item
          name="Dashboard"
          active={activeItem === 'Dashboard'}
          onClick={() => handleItemClick(null, { name: 'Dashboard' })}
        />
      </Link>     

      <Link href="/sell">
        <Menu.Item
          name="Sell"
          active={activeItem === 'Sell'}
          onClick={() => handleItemClick(null, { name: 'Sell' })}
        />
      </Link>

      <Link href="/buy">
        <Menu.Item
          name="Buy"
          active={activeItem === 'Buy'}
          onClick={() => handleItemClick(null, { name: 'Buy' })}
        />
      </Link>


    </Menu>
  );
};

export default TradeMenu;
