import { useState } from "react";
import styles from "./Counter.module.css";

function Counter() {
  let [num, setNum] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.counter}>
        <div className={styles.display}>
          <span className={styles.under}>88888888</span>
          <span className={styles.over}>{num}</span>
        </div>

        <button onClick={() => setNum((num) => num + 1)}>Inc</button>
        <button onClick={() => setNum((_) => 0)}>Reset</button>
        <button onClick={() => setNum((num) => num - 1)}>Dec</button>
      </div>
    </div>
  );
}

export default Counter;
