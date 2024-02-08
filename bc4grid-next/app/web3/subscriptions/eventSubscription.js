import { useEffect, useRef } from 'react';
import { useEthExplorer } from '@/app/web3/context/ethExplorerContext';

function useEventSubscription(eventName, eventHandler) {
    const {ethExplorer, setEthExplorer} = useEthExplorer();
    const subscriptionRef = useRef(null);
  
    useEffect(() => {
      if (!ethExplorer) {
        console.log('ethExplorer is not initialized yet.');
        return;
      }
  
      // Check if we already have an active subscription
      if (subscriptionRef.current) {
        console.log('Already subscribed to event.');
        return;
      }
  
      const subscribeToEvents = async () => {
        const blockNumber = await ethExplorer.getBlockNumber();        
        const subscription = ethExplorer.getSubscription(eventName);
        if (subscription) {
          console.log('Already subscribed to event.');
          subscriptionRef.current = subscription;
        }
        // Subscribe to the event
        subscriptionRef.current = await ethExplorer.subscribeToContractEvent(
          'Trading',
          eventName,
          blockNumber,
          eventHandler
        );
      };
      console.log('Subscribing to ', eventName, ' event ...');
  
      subscribeToEvents();
  
      // Cleanup function to unsubscribe from events
      return () => {
        if (subscriptionRef.current) {
          // Perform cleanup here, such as unsubscribing from the event
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        }
      };
    }, [ethExplorer]); // Dependency array includes ethExplorer
}


export default useEventSubscription;