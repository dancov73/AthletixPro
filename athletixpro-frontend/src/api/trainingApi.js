// src/api/trainingApi.js
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

// Recupera tutti gli allenamenti
export const getAllTrainingSessions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allenamenti`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero degli allenamenti:", error);
    throw error;
  }
};

// Recupera un allenamento specifico
export const getTrainingSession = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allenamenti/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli dell'allenamento:", error);
    throw error;
  }
};

// Aggiungi un nuovo allenamento
export const addTrainingSession = async (trainingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/allenamenti`, trainingData);
    return response.data;
  } catch (error) {
    console.error("Errore nell'aggiunta dell'allenamento:", error);
    throw error;
  }
};
