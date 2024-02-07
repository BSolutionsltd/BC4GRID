"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { set } from 'date-fns';

function formatDateTime(date) {    
    return date.toISOString().slice(0, 19);
}

const EnergyDataContext = createContext();

export const useEnergyData = () => useContext(EnergyDataContext);

const createUrlWithParams = (base, params) => {
    const url = new URL(base, window.location.origin);
    url.search = new URLSearchParams(params).toString();
    return url;
};

export const EnergyDataProvider = ({ children }) => {
    const { data: session } = useSession();
    const [data, setData] = useState([]); 
    const [tokenizationTime, setTokenizationTime] = useState(''); 
    const [meter, setMeter] = useState({});
    const [initialFetch, setInitialFetch] = useState(true); // [1

    // initial date

    const startDate = new Date('2024-01-01T00:00:00');
    const refreshInterval = 1 * 60 * 1000; // 1 min    
    
    // fetching data
    const fetchData = async (userId, from, to, isInitialFetch) => {
        const url = createUrlWithParams('/api/auth/smart-meter/history', {
            userId,
            from: from && formatDateTime(from),
            to: to && formatDateTime(to)
        });

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data');

            const responseData = await response.json();
            const filteredData = responseData.map(item => ({
                time: new Date(item.time).toISOString(),
                total_production: item.total_production,
                total_consumption: item.total_consumption
            }));

            setData(prevData => isInitialFetch ? filteredData : [...prevData, ...filteredData]);
        } catch (error) {
            console.error(error);
        }
    };

    // set meter info
    useEffect(() => {
        if (!session) return;
        const url = createUrlWithParams('/api/auth/smart-meter/info', { userId: session.user.id });

        fetch(url)
            .then(response => response.json())
            .then(setMeter)
            .catch(console.error);
    }, [session]);

    // if meter.sn is defined, fetch tokenization time and data
    useEffect( () => {   
        const getDataFromTimestamp = async () => {       
            
            if (!meter.sn) return;    
            const smartMeterSN = meter.sn;            
            const url = createUrlWithParams('/api/auth/smart-meter/timer', { smartMeterSN });

            // retrieve tokenization time
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();            
                const latestTokenizationTime = new Date(data.timestamp);
                console.log('Latest tokenization time: ', latestTokenizationTime);
                // fetch data from the latest tokenization time as initial fetch
                await fetchData(session.user.id, latestTokenizationTime, null, true);

                
            } else {
                console.log('There is no tokenization time, reverting to default value.');
                // fet
                await fetchData(session.user.id, startDate, null, true);
            }

            setTokenizationTime(data.timestamp);
            setInitialFetch(false);

            console.log('Tokenization time: ', tokenizationTime);
            console.log('Initial fetch: ', initialFetch);
        }        

        getDataFromTimestamp();
            
    }, [meter.sn]);

    useEffect(() => {
        if (!session || initialFetch) return;        
        const fetchDataInterval = async () => {
            const now = new Date();
            const from = new Date(now.getTime() - refreshInterval);
            // fetch data every refreshInterval but not as an initial fetch
            await fetchData(session.user.id, from, null, false);
            console.log('Fetching data every ', refreshInterval, 'ms');
        };

        const intervalId = setInterval(fetchDataInterval, refreshInterval);
        return () => clearInterval(intervalId);
    }, [session, initialFetch]);

    return (
        <EnergyDataContext.Provider value={{data, setData, tokenizationTime, setTokenizationTime}}>
            {children}
        </EnergyDataContext.Provider>
    );
};