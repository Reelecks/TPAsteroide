import "./App.css";
import AlertBanner from "./components/AlertBanner";
import MeteorList from "./components/MeteorList";
import TopBar from "./components/TopBar";
import dataJson from "./FakeDatas.json";

function App() {
  const threatCount = dataJson.filter((obj) => obj.menace).length;
  return (
    <div id="app">
      <TopBar />
      <AlertBanner threatCount={threatCount} />
      <MeteorList data={dataJson} />
    </div>
  );
}

export default App;
