// src/api/atleteApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

// Recupera la lista degli atleti
export const getAtleti = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/atleti`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero degli atleti:", error);
    throw error;
  }
};

// Recupera un atleta specifico
export const getAtleta = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/atleti/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli dell'atleta:", error);
    throw error;
  }
};

// Aggiungi un nuovo atleta
export const addAtleta = async (atletaData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/atleti`, atletaData);
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiunta dell'atleta:", error);
    throw error;
  }
};
