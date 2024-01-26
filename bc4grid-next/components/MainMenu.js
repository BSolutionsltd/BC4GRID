import React, { useState, useEffect, useRef } from 'react';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';

import { useSession } from 'next-auth/react';
import Link from 'next/link'; 

const MainMenu = () => {
  const { data: session } = useSession();
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null); 
  
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMouseEnter = (name) => {
    setActiveItem(name);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
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
      <Icon
        name="bars"
        size="big"
        style={{ cursor: 'pointer' }}
        onClick={toggleMenu}
      />

      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={menuVisible}
        icon="labeled"
        direction="left"
        vertical
      >
        {session ? (
          <>
            <Link href="/dashboard" passHref>
              <Menu.Item 
                name="trading" 
                active={activeItem === 'trading'}
                onMouseEnter={() => handleMouseEnter('trading')}
                onMouseLeave={handleMouseLeave}              
              />
            </Link>
            <Link href="/history" passHref>
            <Menu.Item 
                name="transactions" 
                active={activeItem === 'transactions'}
                onMouseEnter={() => handleMouseEnter('transactions')}
                onMouseLeave={handleMouseLeave}              
              />
            </Link>
            <Link href="/statistics" passHref>
            <Menu.Item 
                name="monitoring" 
                active={activeItem === 'monitoring'}
                onMouseEnter={() => handleMouseEnter('monitoring')}
                onMouseLeave={handleMouseLeave}              
              />
            </Link>
          </>
        ) : (null)}

      <Link href="/about" passHref>
            <Menu.Item 
                name="about" 
                active={activeItem === 'about'}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}              
              />
          </Link>
      </Sidebar>
    </div>
  );
};

export default MainMenu;
