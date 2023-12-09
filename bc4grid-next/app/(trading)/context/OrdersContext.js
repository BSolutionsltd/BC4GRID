// Persistent cart
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedOrdersContext = createContext();

export const useSelectedOrders = () => useContext(SelectedOrdersContext);

export const SelectedOrdersProvider = ({ children }) => {
  const [selectedOrders, setSelectedOrders] = useState(() => {
    // Get the persisted selected items from localStorage
    const savedItems = localStorage.getItem('selectedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // Persist the selected items to localStorage whenever they change
    localStorage.setItem('selectedOrders', JSON.stringify(selectedOrders));
  }, [selectedOrders]);

  return (
    <SelectedOrdersContext.Provider value={{ selectedOrders, setSelectedOrders }}>
      {children}
    </SelectedOrdersContext.Provider>
  );
};
