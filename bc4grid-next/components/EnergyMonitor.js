
import React, { useState, useEffect } from 'react';
import { useEnergyData } from '@/app/energy/context/EnergyDataProvider';

import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  PointElement, 
  LinearScale, 
  Title, 
  TimeScale } from 'chart.js';
  

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Title);


import { Header, Button } from 'semantic-ui-react';


function EnergyGraph() {
  const { data, setData } = useEnergyData();

  useEffect(() => {
    //console.log('dataPoints on Monitor: ', data);
  }, [data]);


  const chartData = data ? {
    labels: data.map(point => point.time),
    datasets: [
      {
        label: 'Production Energy in KWh',
        data: data.map(point => point.total_production),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      },
      {
        label: 'Consumption Energy in KWh',
        data: data.map(point => point.total_consumption),
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }
    ]
  } : null;

  const options = {
    aspectRatio: 3,
    scales: {
      x: {
        type: 'time',
        
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
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Header as='h3'> Energy Production and Consumption After Tokenization</Header>
      <Button basic icon='trash' onClick={() => setDataPoints([])} />
    </div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default EnergyGraph;