"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import formatDateTime from "@/lib/timeFormat";

const EnergyDataContext = createContext();

export const useEnergyData = () => useContext(EnergyDataContext);

export const EnergyDataProvider = ({ children }) => {
        
        const [data, setData] = useState({}); 
        const [dataPoints, setDataPoints] = useState([]);
        const refreshInterval = 1 * 60 * 1000; // 1 minute
    
        useEffect(() => {
                const fetchData = () => {
                    // Get the current time
                    const now = new Date();
                    const past = new Date(now.getTime() - 15 * 60 * 1000);
                     
                // Create a new URL object
                const url = new URL('/api/auth/smart-meter/history', window.location.origin);
        
                // Create a new URLSearchParams object
                const params = new URLSearchParams({
                    from: formatDateTime(past),
                    to: formatDateTime(now)
                });
        
                // Set the search parameters of the URL
                url.search = params.toString();
                // Set the search parameters of the URL
                url.search = params.toString();
            
                // Make the fetch call
                fetch(url)
                    .then(response => response.json())
                    .then(data => {    
                        setData(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Handle the error
                    });
                    };
        
                fetchData();  
                console.log('fetching data: ', data);
                const intervalId = setInterval(fetchData, refreshInterval);
                return () => clearInterval(intervalId);
            }, []);

            useEffect(() => {
                if (data.total_production != null && data.total_consumption != null) {
                    setDataPoints(prevDataPoints => [
                        ...prevDataPoints,
                        {
                            timestamp: new Date().toISOString(),
                            total_production: data.total_production,
                            total_consumption: data.total_consumption
                        }
                    ]);
                }
                
            }, [data]);

            return (
                <EnergyDataContext.Provider value={[dataPoints, setDataPoints]}>
                    {children}
                </EnergyDataContext.Provider>
            );
            
        
    };

  