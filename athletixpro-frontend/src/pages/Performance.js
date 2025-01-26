import React from 'react';
import { useAuth } from '../context/authContext';

const Performance = () => {
  const { profileType } = useAuth();

  return (
    <>
      {/* Riferimenti a CoachPerformance e AthletePerformance rimossi */}
      <div>
        <h1>Performance Page</h1>
        <p>Contenuti relativi alle performance per il profilo: {profileType}</p>
      </div>
    </>
  );
};

export default Performance;