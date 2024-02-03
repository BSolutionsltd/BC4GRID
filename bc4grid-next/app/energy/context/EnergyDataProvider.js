"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

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
    const startDate = new Date('2024-01-27T00:00:00');
    const refreshInterval = 1 * 60 * 1000; // 1 min        

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

    useEffect(() => {
        if (!session) return;
        const url = createUrlWithParams('/api/auth/smart-meter/info', { userId: session.user.id });

        fetch(url)
            .then(response => response.json())
            .then(setMeter)
            .catch(console.error);
    }, [session]);

    useEffect(() => {
        if (!session || !meter.sn) return;
        const userId = session.user.id;
        const url = createUrlWithParams('/api/auth/smart-meter/timer', { userId });

        fetch(url)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                setTokenizationTime(data.timestamp);
                const checkpoint = data.timestamp ? new Date(data.timestamp) : startDate;
                fetchData(userId, checkpoint, null, true);
            })
            .catch(console.error);
    }, [session, meter.sn]);

    useEffect(() => {
        if (!session) return;
        const fetchDataInterval = () => {
            const now = new Date();
            const from = new Date(now.getTime() - refreshInterval);
            fetchData(session.user.id, from, null, false);
        };

        const intervalId = setInterval(fetchDataInterval, refreshInterval);
        return () => clearInterval(intervalId);
    }, [session, fetchData]);

    return (
        <EnergyDataContext.Provider value={{data, setData, tokenizationTime, setTokenizationTime}}>
            {children}
        </EnergyDataContext.Provider>
    );
};