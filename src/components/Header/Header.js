import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header className="header">
    <h1>AthletixPro</h1>
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/athletes">Atleti</Link></li>
        <li><Link to="/trainings">Allenamenti</Link></li>
        <li><Link to="/tests">Test</Link></li>
        <li><Link to="/comparisons">Confronti</Link></li>
        <li><Link to="/settings">Impostazioni</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
