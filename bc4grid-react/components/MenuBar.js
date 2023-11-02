import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import  Link  from 'next/link';


const MenuBar = (props) => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu pointing secondary >
      <Link href="/">
        <Menu.Item
          name="Home"
          active={activeItem === 'Home'}
          onClick={() => handleItemClick(null, { name: 'Home' })}
        />
      </Link>

      <Link href="/buy">
      <Menu.Item
          name="Buy"
          active={activeItem === 'Buy'}
          onClick={() => handleItemClick(null, { name: 'Buy' })}
        />
      </Link>

      <Link href="/sell">
      <Menu.Item
          name="Sell"
          active={activeItem === 'Sell'}
          onClick={() => handleItemClick(null, { name: 'Sell' })}
        />
      </Link>
    </Menu>    
  );
};

export default MenuBar;