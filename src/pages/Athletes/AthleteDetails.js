import React from "react";
import { useParams } from "react-router-dom";

const AthleteDetails = () => {
  const { id } = useParams();
  // Simuliamo i dati dell'atleta
  const athlete = {
    id,
    name: "Mario Rossi",
    category: "Juniores",
    age: 18,
    specialization: "100m",
    bestPerformances: {
      "100m": "10.80",
      "200m": "22.30",
    },
  };

  return (
    <div>
      <h2>Dettagli Atleta: {athlete.name}</h2>
      <p>Categoria: {athlete.category}</p>
      <p>Età: {athlete.age}</p>
      <p>Specializzazione: {athlete.specialization}</p>
      <h3>Migliori Prestazioni</h3>
      <ul>
        {Object.entries(athlete.bestPerformances).map(([event, time]) => (
          <li key={event}>{event}: {time}</li>
        ))}
      </ul>
    </div>
  );
};

export default AthleteDetails;
