import { AlertBanner } from "./components/alert_banner/alert_banner";
import { Footer } from "./components/footer/footer";
import { MeteorList } from "./components/meteor_list/meteor_list";
import { SpaceMap } from "./components/space_map/space_map";
import { TopBar } from "./components/top_bar/top_bar";
import dataJson from "./fake_datas.json";
import "./styles/app.css";
import "./styles/reset.css";
import "./styles/root.css";

export function App() {
  const threatCount = dataJson.filter((obj) => obj.menace).length;
  return (
    <div id="app">
      <TopBar />
      <AlertBanner threatCount={threatCount} />
      <div className="main">
        <SpaceMap data={dataJson} />
        <MeteorList data={dataJson} />
      </div>
      <Footer />
    </div>
  );
}
