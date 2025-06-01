import { MeteorObject, MeteorType } from "../../types";
import classes from "./space_map.module.css";

export const SpaceMap = ({ data }: { data: MeteorObject[] }) => (
  <div className={classes["space-map"]}>
    {data.map((obj) => (
      <div
        key={obj.id}
        className={`${classes["space-object"]} ${obj.type as MeteorType} ${
          obj.menace ? classes["menace"] : ""
        }`}
        style={{
          left: `${obj.coord.x}%`,
          top: `${obj.coord.y}%`,
          width: "12px",
          height: "12px",
        }}
        title={obj.nom}
      />
    ))}
  </div>
);

export default SpaceMap;
