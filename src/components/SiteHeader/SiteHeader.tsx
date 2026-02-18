import { ReactSVG } from "react-svg";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <div className={styles.wrapper}>
      <div style={{ position: "relative", minHeight: "32px" }}>
        <ReactSVG
          src="/React-icon.svg"
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            zIndex: 20,
            top: "4px",
          }}
        />
        <ReactSVG
          src="/React-icon.svg"
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            top: "6px",
            "--fill": "black",
            zIndex: 10,
          }}
        />
        <span
          style={{
            paddingLeft: "40px",
            color: "#61dafb",
            textShadow: "0 2px 0 black",
            fontSize: "1.4em",
            fontWeight: 200,
          }}
        >
          React Examples
        </span>
      </div>
    </div>
  );
}
