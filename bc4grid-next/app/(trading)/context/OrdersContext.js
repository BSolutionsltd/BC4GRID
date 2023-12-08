"use client";
// SelectedOrdersContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedOrdersContext = createContext();

export const useSelectedOrders = () => useContext(SelectedOrdersContext);

export const SelectedOrdersProvider = ({ children }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  return (
    <SelectedOrdersContext.Provider value={{ selectedOrders, setSelectedOrders }}>
      {children}
    </SelectedOrdersContext.Provider>
  );
};