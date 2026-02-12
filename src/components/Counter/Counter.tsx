import { useState } from "react";
import styles from "./Counter.module.css";

function Counter() {
  let [num, setNum] = useState(0);

  return (
    <div className={styles.wrapper}>
      <p>Counter</p>

      <p>{num}</p>

      <button onClick={() => setNum((num) => num + 1)}>Inc</button>
      <button onClick={() => setNum((_) => 0)}>Reset</button>
      <button onClick={() => setNum((num) => num - 1)}>Dec</button>
    </div>
  );
}

export default Counter;
