"use client"

import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation'



const TradeMenu = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  //const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    // Update activeItem based on the current route
    //console.log('Putanja: ', pathname);
    const pathToMenuItem = {
      '/dashboard': 'Dashboard',
      '/buy': 'Buy',
      '/sell': 'Sell',
      '/market': 'Market', // Corrected from 'market' to 'Market'
    };

    const menuItem = pathToMenuItem[pathname];
    if (menuItem) {
      setActiveItem(menuItem);
    }
  }, [pathname]);


  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu pointing secondary>
      <Link href="/dashboard" passHref>
        <Menu.Item
          name="Dashboard"
          active={activeItem === 'Dashboard'}       
          onClick={() => handleItemClick(null, { name: 'Dashboard' })}
        />
      </Link>   

       <Link href="/market" passHref>
        <Menu.Item
          name="Market"          
          active={activeItem === 'Market'}
          onClick={() => handleItemClick(null, { name: 'Market' })}
        />
      </Link>  
      <Link href="/buy" passHref>
        <Menu.Item
          name="Buy"          
          active={activeItem === 'Buy'}
          onClick={() => handleItemClick(null, { name: 'Buy' })}
        />
      </Link>

      <Link href="/sell" passHref>
        <Menu.Item
          name="Sell"          
          active={activeItem === 'Sell'}          
          onClick={() => handleItemClick(null, { name: 'Sell' })}
        />
      </Link>

      
     
    </Menu>
  );
};

export default TradeMenu;
