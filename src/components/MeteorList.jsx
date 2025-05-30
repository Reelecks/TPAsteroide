import React, { useState } from "react";
import "../styles/MeteorList.css";

const MeteorList = ({ data }) => {
  const [filter, setFilter] = useState("tous");

  const filteredData = data.filter((obj) => {
    if (filter === "tous") return true;
    return obj.type === filter;
  });

  return (
    <div className="sidebar">
      <div className="header">
        <h2>Objets Détectés</h2>
        <span>{filteredData.length} objets</span>
      </div>

      <div className="filters">
        <button
          onClick={() => setFilter("tous")}
          className={filter === "tous" ? "active" : ""}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter("météorite")}
          className={filter === "météorite" ? "active" : ""}
        >
          Météorites
        </button>
        <button
          onClick={() => setFilter("exoplanète")}
          className={filter === "exoplanète" ? "active" : ""}
        >
          Exoplanètes
        </button>
      </div>

      <ul className="object-list">
        {filteredData.map((obj) => (
          <li
            key={obj.id}
            className={`object-card ${obj.menace ? "danger" : ""}`}
          >
            <div className="name">
              <strong>{obj.nom}</strong>
              <span
                className={`dot ${obj.type} ${obj.menace ? "menace" : ""}`}
              ></span>
            </div>
            <div className="details">
              <p>Distance: {obj.distance}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeteorList;
