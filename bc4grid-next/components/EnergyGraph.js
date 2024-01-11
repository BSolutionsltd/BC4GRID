
import React, { useState, useEffect } from 'react';
import formatDateTime from "@/lib/timeFormat";

import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale, Title, TimeScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Title);


import { Header } from 'semantic-ui-react';

function EnergyGraph({ refreshInterval = 10 * 1000 }) {
  
  const [data, setData] = useState({});  
  const [dataPoints, setDataPoints] = useState([]);
 

  useEffect(() => {
    const fetchData = () => {
      // Get the current time
      const now = formatDateTime(new Date());
      const past = "2024-01-01 00:00:00";  
    // Create a new URL object
    const url = new URL('/api/auth/smart-meter/history', window.location.origin);

    // Create a new URLSearchParams object
    const params = new URLSearchParams({
      from: past,
      to: now
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


  const chartData = {
    labels: dataPoints.map(point => point.timestamp),
    datasets: [
      {
        label: 'Production Energy in KWh',
        data: dataPoints.map(point => point.total_production),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      },
      {
        label: 'Consumption Energy in KWh',
        data: dataPoints.map(point => point.total_consumption),
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    aspectRatio: 3,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Energy in KWh'
        },        
      },     
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    }

  };

 
  return (
    <div>
      <Header as="h2"> Energy Production and Consumption</Header>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default EnergyGraph;