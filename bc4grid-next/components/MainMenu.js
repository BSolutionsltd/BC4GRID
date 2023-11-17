"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';

import Link from 'next/link';

const MainMenu = () => {
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
        <Link href="/dashboard">
          <Menu.Item name="trading" />
        </Link>
        <Link href="/history">
          <Menu.Item name="history" />
        </Link>
        <Link href="/statistics">
          <Menu.Item name="statistics" />
        </Link>
        
      </Sidebar>
    </div>
  );
};

export default MainMenu;
