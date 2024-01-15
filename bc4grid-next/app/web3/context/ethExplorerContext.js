'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import bc4grid from '@/lib/bc4grid/ethExplorer';

const EthExplorerContext = createContext(null);

export const useEthExplorer = () => useContext(EthExplorerContext);

let ethExplorerInstance = null; // This variable will hold the singleton instance

export const EthExplorerProvider = ({ children }) => {
  const [ethExplorer, setEthExplorer] = useState(ethExplorerInstance);
  const { data: session } = useSession();


  useEffect(() => {
    if (!ethExplorer && session?.user) {
      // Only initialize if ethExplorer is not already set
      const initEthExplorer = async () => {
        if (!ethExplorerInstance) {
          // Only create a new instance if one does not already exist
          ethExplorerInstance = await bc4grid();
          setEthExplorer(ethExplorerInstance);
        } else {
          // If an instance already exists, use it
          setEthExplorer(ethExplorerInstance);
        }
      };

      initEthExplorer();
    }

    // Cleanup function to handle component unmounting
    return () => {
      // Perform any necessary cleanup, such as removing event listeners
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect only runs once

  const value = {
    ethExplorer     
  };

  return (
    <EthExplorerContext.Provider value={value}>
      {children}
    </EthExplorerContext.Provider>
  );
};
