import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./Post.module.css";

interface PostProps {
  message: String;
  name: String;
  date: Temporal.PlainDateTime;
  hue: number;
}
function Post({ message, name, date, hue }: PostProps) {
  let [dur, setDur] = useState<Temporal.Duration | null>(null);

  useEffect(() => {
    let now = Temporal.Now.plainDateTimeISO();
    setDur(date.since(now));
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBit}>
        <div
          className={styles.icon}
          style={{
            backgroundColor: `hsl(${hue!}deg 100% 50%)`,
          }}
        >
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>{dur ? (-dur.seconds).toString() + " seconds ago" : ""}</div>
      </div>
      <div className={styles.btmBit}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export { type PostProps };
export default Post;
