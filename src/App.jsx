import "./App.css";
import AlertBanner from "./components/AlertBanner";
import MeteorList from "./components/MeteorList";
import SpaceMap from "./components/SpaceMap";
import TopBar from "./components/TopBar";
import dataJson from "./FakeDatas.json";

function App() {
  const threatCount = dataJson.filter((obj) => obj.menace).length;
  return (
    <div id="app">
      <TopBar />
      <AlertBanner threatCount={threatCount} />
      <div className="main">
        <SpaceMap data={dataJson} />
        <MeteorList data={dataJson} />
      </div>
    </div>
  );
}

export default App;
