import { useState } from "react";
import styles from "./alert_banner.module.css";

export interface AlertBannerProps {
  threatCount: number;
}

export function AlertBanner({ threatCount }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  if (threatCount === 0 || !isVisible) return null;
  function handleClose() {
    setIsVisible(false);
  }
  return (
    <div className={styles["alert-banner"]}>
      <div className={styles["alert-content"]}>
        <div className={styles["alert-content-left"]}>
          <span>⚠️</span>
          <div className={styles.alert}>
            <p className={styles["alert-message"]}>
              ALERTE DE MENACE ({threatCount})
            </p>
            <p>
              {threatCount} objet{threatCount > 1 ? "s" : ""} potentiellement
              dangereux détecté{threatCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className={styles["close-btn"]} onClick={handleClose}>
        ✖
      </div>
    </div>
  );
}
