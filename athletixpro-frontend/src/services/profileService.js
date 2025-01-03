export const getAthleteProfile = async () => {
  // Simula una chiamata API per ottenere i dati del profilo atleta
  return {
    name: 'Mario Rossi',
    age: 25,
    category: 'Senior',
    specialization: 'Corsa',
    vo2max: 55,
    bestPerformances: [
      { event: '100m', time: '10.5s' },
      { event: '200m', time: '21.0s' },
    ],
    performanceData: [
      // Dati per il grafico delle performance
    ],
  };
};

export const getAdminProfile = async () => {
  // Simula una chiamata API per ottenere i dati del profilo amministratore
  return {
    name: 'Admin User',
    age: 40,
    category: 'Admin',
    specialization: 'Gestione',
    vo2max: null,
    bestPerformances: [],
    performanceData: [],
  };
};

export const getCoachProfile = async () => {
  // Simula una chiamata API per ottenere i dati del profilo allenatore
  return {
    name: 'Coach User',
    age: 35,
    category: 'Coach',
    specialization: 'Allenamento',
    vo2max: null,
    bestPerformances: [],
    performanceData: [],
  };
};

export const getParentProfile = async () => {
  // Simula una chiamata API per ottenere i dati del profilo genitore
  return {
    name: 'Parent User',
    age: 45,
    category: 'Parent',
    specialization: 'Supporto',
    vo2max: null,
    bestPerformances: [],
    performanceData: [],
  };
};
