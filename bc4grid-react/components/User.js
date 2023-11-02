
import React, { useState, useEffect, useRef } from 'react';
import { Image, Sidebar, Menu } from 'semantic-ui-react';

// API endpoint: /user/id/
const User = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const closeSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('click', closeSidebar);

    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, []);

  return (
    <div ref={sidebarRef}>
      <Image
        avatar
        centered
        size="mini"
        src="/images/avatar/person.png"
        style={{ cursor: 'pointer' }}
        onClick={toggleMenu}        
      />

      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={menuVisible}
        icon="labeled"
        direction="right"
        vertical
      >
        
        <Menu.Item as="a" href="/profile">Profile</Menu.Item>
        <Menu.Item as="a" href="/login">Login</Menu.Item>        
      </Sidebar>
    </div>
  );
};

export default User;
