import "../styles/SpaceMap.css";

const SpaceMap = ({ data }) => {
  return (
    <div className="space-map">
      {data.map((obj) => (
        <div
          key={obj.id}
          className={`space-object ${obj.type} ${obj.menace ? "menace" : ""}`}
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
};

export default SpaceMap;
