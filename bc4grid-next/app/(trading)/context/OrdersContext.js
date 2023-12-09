import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedOrdersContext = createContext();

export const useSelectedOrders = () => useContext(SelectedOrdersContext);

export const SelectedOrdersProvider = ({ children }) => {
  const [selectedOrders, setSelectedOrders] = useState(() => {
    if (typeof window !== 'undefined') {
      // Get the persisted selected items from sessionStorage
      const savedItems = localStorage.getItem('selectedItems');
      return savedItems ? JSON.parse(savedItems) : [];
    }
    // Return an empty array if window is not defined (server-side)
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Persist the selected items to sessionStorage whenever they change
      sessionStorage.setItem('selectedOrders', JSON.stringify(selectedOrders));
    }
  }, [selectedOrders]);

  return (
    <SelectedOrdersContext.Provider value={{ selectedOrders, setSelectedOrders }}>
      {children}
    </SelectedOrdersContext.Provider>
  );
};
