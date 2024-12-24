import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AthletesList from "./pages/Athletes/AthletesList";
import AthleteDetails from "./pages/Athletes/AthleteDetails";
import AthleteForm from "./pages/Athletes/AthleteForm";

const Dashboard = () => <h2>Dashboard</h2>;
const Athletes = () => <h2>Gestione Atleti</h2>;
const Trainings = () => <h2>Allenamenti</h2>;
const Tests = () => <h2>Test</h2>;
const Comparisons = () => <h2>Confronti</h2>;
const Settings = () => <h2>Impostazioni</h2>;

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<h2>Dashboard</h2>} />
          <Route path="/athletes" element={<AthletesList />} />
          <Route path="/athletes/new" element={<AthleteForm />} />
          <Route path="/athletes/edit/:id" element={<AthleteForm />} />
          <Route path="/athletes/:id" element={<AthleteDetails />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/comparisons" element={<Comparisons />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
