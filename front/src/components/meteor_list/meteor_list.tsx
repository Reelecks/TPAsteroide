import { useState } from "react";
import classes from "./meteor_list.module.css";

export interface MeteorObject {
  id: string;
  nom: string;
  type: string;
  distance: string;
  menace: boolean;
  coord: { x: number; y: number };
}

export interface MeteorListProps {
  data: MeteorObject[];
}

export function MeteorList({ data }: MeteorListProps) {
  const [filter, setFilter] = useState<string>("tous");
  const filteredData = data.filter((obj) => {
    if (filter === "tous") return true;
    return obj.type === filter;
  });
  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <h2>Objets Détectés</h2>
        <span>{filteredData.length} objets</span>
      </div>
      <div className={classes.filters}>
        <button
          onClick={() => setFilter("tous")}
          className={filter === "tous" ? classes.active : ""}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter("météorite")}
          className={filter === "météorite" ? classes.active : ""}
        >
          Météorites
        </button>
        <button
          onClick={() => setFilter("exoplanète")}
          className={filter === "exoplanète" ? classes.active : ""}
        >
          Exoplanètes
        </button>
      </div>
      <ul className={classes["object-list"]}>
        {filteredData.map((obj) => (
          <li
            key={obj.id}
            className={`${classes["object-card"]} ${
              obj.menace ? classes.danger : ""
            }`}
          >
            <div className={classes.name}>
              <strong>{obj.nom}</strong>
              <span
                className={`${classes.dot} ${classes[obj.type]} ${
                  obj.menace ? classes.menace : ""
                }`}
              ></span>
            </div>
            <div className={classes.details}>
              <p>Distance: {obj.distance}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
