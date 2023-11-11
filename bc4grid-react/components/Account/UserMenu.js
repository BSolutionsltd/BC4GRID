import React, { useState, useEffect, useRef } from 'react';
import { Image, Sidebar, Menu, Icon } from 'semantic-ui-react';

// API endpoint: /user/id/
const User = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div ref={sidebarRef}>
      {isLoggedIn ? (
         <Image
         avatar         
         size="mini"
         src="/images/avatar/person.png"
         style={{ cursor: 'pointer' }}
         onClick={toggleMenu}
       />
        
      ) : (
        <Icon
        circular
        size="large"
        name="user"        
        style={{ cursor: 'pointer' }}
        onClick={toggleMenu}
      />
      )}

      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={menuVisible}
        icon="labeled"
        direction="right"
        vertical
      >
        {isLoggedIn && (
          <>
            <Menu.Item as="a" href="/profile">
              Profile
            </Menu.Item>
            <Menu.Item as="a" href="/logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </>
        )}
        {!isLoggedIn && (
          <Menu.Item as="a" href="/login" onClick={handleLogin}>
            Login
          </Menu.Item>
        )}
      </Sidebar>
    </div>
  );
};

export default User;
