import "./App.css";
import MeteorList from "./components/MeteorList";
import TopBar from "./components/TopBar";
import dataJson from "./FakeDatas.json";

function App() {
  return (
    <div id="app">
      <TopBar />
      <MeteorList data={dataJson} />
    </div>
  );
}

export default App;
