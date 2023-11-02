import React, { useState } from 'react';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';

const MainMenu = () => {
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
        <Menu.Item as="a" href="/" > Home </Menu.Item>
        <Menu.Item as="a" href="/history">History</Menu.Item>
        <Menu.Item as="a" href="/statistics">Statistics</Menu.Item>
        <Menu.Item as="a" href="/settings">Settings</Menu.Item>
      </Sidebar>      
    </div>
  );
};

export default MainMenu;
