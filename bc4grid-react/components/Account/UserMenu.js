import React, { useState, useEffect, useRef } from 'react';
import { Image, Sidebar, Menu, Icon } from 'semantic-ui-react';
import {Link} from 'next/link';

// API endpoint: /user/id/
const User = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [session, loading] = useSession(); // useSession hook from next-auth/client
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
  const sidebarRef = useRef(null);

  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    if (!loading) {
      setIsLoggedIn(!!session);
    }
  }, [loading, session]);
  

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
          <Link href="/auth/profile" passHref>
              <Menu.Item name="Profile" />
          </Link>          
          <Link>
            <Menu.Item  name="Logout"  onClick={handleLogout} />
          </Link>
          </>
        )}
        {!isLoggedIn && (
          <Link href="/auth/login" passHref>
          <Menu.Item  name="Login" onClick={handleLogin} />
            </Link>
        )}
      </Sidebar>
    </div>
  );
};

export default User;
