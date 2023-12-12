'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import bc4grid from '@/lib/bc4grid/ethExplorer';

const EthExplorerContext = createContext(null);

export const useEthExplorer = () => useContext(EthExplorerContext);

export const EthExplorerProvider = ({ children }) => {
  const [ethExplorer, setEthExplorer] = useState(null);

  // Generate a unique identifier for this instance of the provider
  const uniqueId = Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    const initEthExplorer = async () => {
      const explorer = await bc4grid();
      setEthExplorer(explorer);

      console.log(`EthExplorer initialized for provider ID: ${uniqueId}`);
    };

    initEthExplorer();
  }, []);

  const value = {
    ethExplorer,
    setEthExplorer,
  };

  console.log('useEthExplorer is called ');


  return (
    <EthExplorerContext.Provider value={value}>
      {children}
    </EthExplorerContext.Provider>
  );
};