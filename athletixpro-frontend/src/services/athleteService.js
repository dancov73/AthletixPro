// src/services/athleteService.js
export const getAthleteProfile = async () => {
    // Simula una chiamata API per ottenere i dati dell'atleta
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "John Doe",
          age: 25,
          category: "Senior",
          specialization: "Sprint",
          vo2max: 60,
          bestPerformances: [
            { event: "100m", time: "10.5s" },
            { event: "200m", time: "21.8s" }
          ],
          performanceData: [/* Dati per il grafico delle performance */]
        });
      }, 1000);
    });
  };
  