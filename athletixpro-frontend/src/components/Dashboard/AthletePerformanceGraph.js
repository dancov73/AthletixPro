// src/components/Dashboard/AthletePerformanceGraph.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AthletePerformanceGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="performance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AthletePerformanceGraph;
