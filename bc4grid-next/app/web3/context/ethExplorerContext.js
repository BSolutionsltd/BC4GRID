'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import bc4grid from '@/lib/bc4grid/ethExplorer';

const EthExplorerContext = createContext(null);

export const useEthExplorer = () => useContext(EthExplorerContext);

export const EthExplorerProvider = ({ children }) => {
  const [ethExplorer, setEthExplorer] = useState(null);

  useEffect(() => {
    const initEthExplorer = async () => {
      const explorer = await bc4grid();
      setEthExplorer(explorer);
    };

    initEthExplorer();
  }, []);

  const value = {
    ethExplorer,
    setEthExplorer,
  };

  return (
    <EthExplorerContext.Provider value={value}>
      {children}
    </EthExplorerContext.Provider>
  );
};