import { useEffect, useState } from "react";
import { AlertBanner } from "./components/alert_banner/alert_banner";
import { Footer } from "./components/footer/footer";
import { MeteorList } from "./components/meteor_list/meteor_list";
import { SpaceMap } from "./components/space_map/space_map";
import { TopBar } from "./components/top_bar/top_bar";
import { getTopSpeed } from "./lib/request";
import "./styles/app.css";
import "./styles/reset.css";
import "./styles/root.css";
import { MeteorObject, TopSpeed } from "./types";

export function App() {
  const [data, setData] = useState<MeteorObject[]>([]);
  useEffect(() => {
    getTopSpeed().then((raw) => {
      console.log(raw);
      setData(
        raw.map((obj: TopSpeed) => ({
          id: obj.id,
          nom: obj.id,
          type: obj.type,
          distance: obj.taille + " km",
          menace: obj.vitesse > 30,
          coord: { x: Math.random() * 100, y: Math.random() * 100 },
        }))
      );
    });
  }, []);
  const threatCount = data.filter((obj) => obj.menace).length;
  return (
    <div id="app">
      <TopBar />
      <AlertBanner threatCount={threatCount} />
      <div className="main">
        <SpaceMap data={data} />
        <MeteorList data={data} />
      </div>
      <Footer />
    </div>
  );
}
