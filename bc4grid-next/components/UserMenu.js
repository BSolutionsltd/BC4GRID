"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Image, Sidebar, Menu, Icon } from 'semantic-ui-react';

import Link from 'next/link';

// authentication
import { useSession, signOut } from 'next-auth/react';

// API endpoint: /user/id/
const User = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const sidebarRef = useRef(null);

  // session management
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [activeItem, setActiveItem] = useState(null);

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
      {session ? (
        <div style={{ float: 'right' }}>
            <span style={{ marginRight: '10px' }}><strong>{session.user.name || ' '}</strong></span>
          <Image
            avatar
            size="mini"
            src={session.user.image || '/default-avatar.png'} // Fallback to a default avatar if no image is provided
            alt="User Avatar"
            style={{ cursor: 'pointer' }}
            onClick={toggleMenu}
          />
        </div>
      ) : (
        <div style={{ float: 'right' }}>
            <span style={{ marginRight: '10px' }}><strong>{' '}</strong></span>
        <Icon
          circular
          size="large"
          name="user"
          style={{ cursor: 'pointer' }}
          onClick={toggleMenu}
        />
        </div>
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
        {session ? (
          <>
            <Link href="/auth/profile" passHref>
            <Menu.Item
                name="profile"
                active={activeItem === 'profile'}
                onMouseEnter={() => handleMouseEnter('profile')}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
            {/* Conditionally render the Administration menu item */}
            {session.user.isAdmin && (
               <Link href="/auth/admin" passHref>
               <Menu.Item
                 name="administration"
                 active={activeItem === 'administration'}
                 onMouseEnter={() => handleMouseEnter('administration')}
                 onMouseLeave={handleMouseLeave}
               />
             </Link>
            )}
            <Menu.Item name="logout" onClick={() => signOut({ callbackUrl: '/' })} />
          </>
        ) : (
          <>
            <Link href="/auth/login" passHref>
              <Menu.Item
                name="login"
                active={activeItem === 'login'}
                onMouseEnter={() => handleMouseEnter('login')}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
            <Link href="/auth/register" passHref>
              <Menu.Item
                name="register"
                active={activeItem === 'register'}
                onMouseEnter={() => handleMouseEnter('register')}
                onMouseLeave={handleMouseLeave}
              />
          </Link>
          </>
        )}
      </Sidebar>
    </div>
  );
};

export default User;
