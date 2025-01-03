// src/components/Dashboard/PerformanceGraph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const PerformanceGraph = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.data),
    datasets: [
      {
        label: 'Performance',
        data: data.map(item => item.performance),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h3>Grafico delle Performance</h3>
      <Line data={chartData} />
    </div>
  );
};

export default PerformanceGraph;
