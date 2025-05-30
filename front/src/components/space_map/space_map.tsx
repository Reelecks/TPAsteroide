import classes from "./space_map.module.css";

export const SpaceMap = ({ data }: { data: any[] }) => (
  <div className={classes["space-map"]}>
    {data.map((obj) => (
      <div
        key={obj.id}
        className={`${classes["space-object"]} ${obj.type} ${
          obj.menace ? classes["menace"] : ""
        }`}
        style={{
          left: `${obj.coord.x}%`,
          top: `${obj.coord.y}%`,
          width: "12px",
          height: "12px",
        }}
        title={obj.nom}
      ></div>
    ))}
  </div>
);

export default SpaceMap;
