import { useEffect, useRef, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./Post.module.css";

interface PostProps {
  id: number;
  message: string;
  name: string;
  date: string;
  hue: number;
}
function Post({ message, name, date, hue }: PostProps) {
  let [dur, setDur] = useState<Temporal.Duration | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(0);

  useEffect(() => {
    const update = () => {
      let now = Temporal.Now.plainDateTimeISO();
      setDur(Temporal.PlainDateTime.from(date).since(now));
    };

    update();
    intervalRef.current = setInterval(update, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

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
