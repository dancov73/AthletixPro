import React from "react";
import { Link } from "react-router-dom";
import "./AthletesList.css";

const athletes = [
  { id: 1, name: "Mario Rossi", category: "Juniores" },
  { id: 2, name: "Luca Bianchi", category: "Seniores" },
];

const AthletesList = () => (
  <div className="athletes-list">
    <h2>Elenco Atleti</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {athletes.map((athlete) => (
          <tr key={athlete.id}>
            <td>{athlete.name}</td>
            <td>{athlete.category}</td>
            <td>
              <Link to={`/athletes/${athlete.id}`}>Dettagli</Link> |{" "}
              <Link to={`/athletes/edit/${athlete.id}`}>Modifica</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link to="/athletes/new" className="add-athlete-btn">Aggiungi Atleta</Link>
  </div>
);

export default AthletesList;
