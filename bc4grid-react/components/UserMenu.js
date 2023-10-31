import React, { useState } from 'react';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';

const UserMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div>
      <Icon
        name="bars"
        size="big"
        style={{ cursor: 'pointer', float: 'right' }}
        onClick={toggleMenu}
      />

      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={menuVisible}
        icon="labeled"
        direction = "right"
        vertical        
      >
        <Menu.Item as="a">Home</Menu.Item>
        <Menu.Item as="a">History</Menu.Item>
        <Menu.Item as="a">Statistics</Menu.Item>
        <Menu.Item as="a">Settings</Menu.Item>
      </Sidebar>      
    </div>
  );
};

export default UserMenu;
