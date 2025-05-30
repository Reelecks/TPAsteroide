import { useEffect, useState } from "react";
import classes from "./top_bar.module.css";

const useTimer = (): Date => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
};

export function TopBar() {
  const time = useTimer();
  return (
    <nav className={classes.navbar}>
      <a href="#">SPACE MONITOR</a>
      <div className={classes.hour}>
        <p>HEURE ACTUELLE : </p>
        <p>{time.toLocaleTimeString()}</p>
      </div>
    </nav>
  );
}
