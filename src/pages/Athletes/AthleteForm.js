import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AthleteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [athlete, setAthlete] = useState(
    isEdit
      ? { name: "Mario Rossi", category: "Juniores", age: 18, specialization: "100m" }
      : { name: "", category: "", age: "", specialization: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAthlete({ ...athlete, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati salvati:", athlete);
    navigate("/athletes");
  };

  return (
    <div>
      <h2>{isEdit ? "Modifica Atleta" : "Aggiungi Nuovo Atleta"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" value={athlete.name} onChange={handleChange} required />
        </label>
        <label>
          Categoria:
          <input type="text" name="category" value={athlete.category} onChange={handleChange} required />
        </label>
        <label>
          Età:
          <input type="number" name="age" value={athlete.age} onChange={handleChange} required />
        </label>
        <label>
          Specializzazione:
          <input type="text" name="specialization" value={athlete.specialization} onChange={handleChange} />
        </label>
        <button type="submit">Salva</button>
      </form>
    </div>
  );
};

export default AthleteForm;
