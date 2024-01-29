import React, { useState, useEffect, useRef } from 'react';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';

import { useSession } from 'next-auth/react';
import Link from 'next/link'; 

import {style} from '@/components/ui/style.css.js';

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
        style={{ cursor: 'pointer', color: menuVisible ? style.primary.color : 'black' }}
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

            <Link href="/Help" passHref>
              <Menu.Item 
                name="help" 
                active={activeItem === 'help'}
                onMouseEnter={() => handleMouseEnter('help')}
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
