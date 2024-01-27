"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';


function formatDateTime(date) {    
    return date.toISOString().slice(0, 19);
  }

const EnergyDataContext = createContext();

export const useEnergyData = () => useContext(EnergyDataContext);

export const EnergyDataProvider = ({ children }) => {
        // session information
        const { data: session } = useSession();
        // data points
        const [data, setData] = useState([]); 
        const [tokenizationTime, setTokenizationTime] = useState(''); 
        
        // refresh interval
        const refreshInterval = 1 * 60 * 1000; // 1 min

        const fetchData = (userId, from, to, isInitialFetch) => {
            // Create a new URL object
            const url = new URL('/api/auth/smart-meter/history', window.location.origin);
            // Create a new URLSearchParams object
            const params = new URLSearchParams();
            // Add the userId to the parameters
            params.append('userId', userId);
            // Add the from and to parameters if they are provided
            if (from) {
              params.append('from', formatDateTime(from));
            }
            if (to) {
              params.append('to', formatDateTime(to));
            }
            // Set the search parameters of the URL
            url.search = params.toString();
          
            // Make the fetch call
            fetch(url)
            .then(response => {                
                return response.json();
            })
            .then(data => {
                const filteredData = data.map(item => ({
                    time: new Date(item.time).toISOString(),
                    total_production: item.total_production,
                    total_consumption: item.total_consumption
                }));

                if (isInitialFetch) {                           
                    setData(filteredData);
                } else {
                    console.log('limit-1 fetching data: ', filteredData);             
                    setData(prevData => [...prevData, ...filteredData]);
                }
            })
              .catch(error => {
                console.error('Error:', error);
                // Handle the error
              });

              console.log('data on Provider: ', data);
          };
          
        useEffect(() => {
            // Initial fetch of data from the start of the day
            if (session) {
                const userId = session.user.id;
                const params = new URLSearchParams({ userId: userId });
                const url = '/api/auth/smart-meter/timer?' + params.toString();
                
                console.log('url: ', url);
                fetch('/api/auth/smart-meter/timer?' + params.toString())
                    .then(response => response.json())
                    .then(data => {
                        console.log('Latest timestamp: ', data.timestamp);
                        setTokenizationTime(data.timestamp);
                        const checkpoint = data.timestamp ? new Date(data.timestamp) : new Date('2024-01-27T00:00:00');

                        console.log('checkpoint: ', checkpoint);
                        fetchData(userId, checkpoint, null, true);
                    });
                
            }
        }, [session]);
          
          useEffect(() => {
            // Periodic fetch of data every 5 seconds
            const fetchDataInterval = () => {
              const now = new Date();
              const from = new Date(now.getTime() - refreshInterval);
              const userId = session?.user?.id; // Assuming the user object has an id property
              fetchData(userId, from, null, false);
            };
          
            const intervalId = setInterval(fetchDataInterval, refreshInterval);
            return () => clearInterval(intervalId);
          }, [session, fetchData]);

            return (
                <EnergyDataContext.Provider 
                value={{data, setData, tokenizationTime, setTokenizationTime}}>
                    {children}
                </EnergyDataContext.Provider>
            );           
        
    };

  