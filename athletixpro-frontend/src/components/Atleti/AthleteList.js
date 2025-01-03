// src/components/Atleti/AthleteList.js
import React, { useEffect, useState } from 'react';
import { getAtleti } from '../../api/atleteApi';

const AthleteList = () => {
  const [atleti, setAtleti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtleti = async () => {
      try {
        const atletiData = await getAtleti();
        setAtleti(atletiData);
      } catch (error) {
        console.error("Errore nel recupero della lista degli atleti:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtleti();
  }, []);

  if (loading) return <p>Caricamento in corso...</p>;

  return (
    <div>
      <h2>Lista Atleti</h2>
      <ul>
        {atleti.map(atleta => (
          <li key={atleta.id}>{atleta.nome} {atleta.cognome}</li>
        ))}
      </ul>
    </div>
  );
};

export default AthleteList;
