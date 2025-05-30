import { useState } from "react";
import "../styles/AlertBanner.css";

const AlertBanner = ({ threatCount }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (threatCount === 0 || !isVisible) return null;

  function handleClose() {
    setIsVisible(false);
  }

  return (
    <div className="alert-banner">
      <div className="alert-content">
        <div className="alert-content-left">
          <span>⚠️</span>
          <div className="alert">
            <p className="alert-message">ALERTE DE MENACE ({threatCount})</p>
            <p>
              {threatCount} objet{threatCount > 1 ? "s" : ""} potentiellement
              dangereux détecté{threatCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="close-btn" onClick={handleClose}>
        ✖
      </div>
    </div>
  );
};

export default AlertBanner;
