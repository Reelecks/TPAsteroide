import "../styles/reset.css";
import "../styles/TopBar.css";
import "../styles/root.css";

const TopBar = () => {
  return (
    <nav id="navbar">
      <a href="#">SPACE MONITOR</a>
      <div className="hour">
        <p>HEURE ACTUELLE : </p>
        <p>12 : 03 : 57 </p>
      </div>
    </nav>
  );
};

export default TopBar;
