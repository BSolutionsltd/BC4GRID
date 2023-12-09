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
  const { data: session } = useSession();

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
      {session ? (
        <div style={{ float: 'right' }}>
          <span style={{ marginRight: '10px' }}>Hello, <strong>{session.user.name}</strong></span>
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
        {session ? (
          <>
            <Link href="/auth/profile" passHref>
              <Menu.Item name="profile" />
            </Link>
            {/* Conditionally render the Administration menu item */}
            {session.user.isAdmin && (
              <Link href="/auth/admin" passHref>
                <Menu.Item name="administration" />
              </Link>
            )}
            <Menu.Item name="logout" onClick={() => signOut({ callbackUrl: '/' })} />
          </>
        ) : (
          <>
            <Link href="/auth/login" passHref>
              <Menu.Item name="login" />
            </Link>
            <Link href="/auth/register" passHref>
              <Menu.Item name="register" />
            </Link>
          </>
        )}
      </Sidebar>
    </div>
  );
};

export default User;
