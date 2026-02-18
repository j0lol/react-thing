import { useEffect, useRef, useState } from "react";
import { Temporal } from "temporal-polyfill";
import styles from "./Post.module.css";

const THRESHOLDS = [
  { unit: "year", seconds: 60 * 60 * 24 * 365 },
  { unit: "month", seconds: 60 * 60 * 24 * 30 },
  { unit: "week", seconds: 60 * 60 * 24 * 7 },
  { unit: "day", seconds: 60 * 60 * 24 },
  { unit: "hour", seconds: 60 * 60 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];

function formatRelative(
  target: Temporal.Instant,
  locale = "en",
): string {
  const now = Temporal.Now.instant();
  const diffSeconds = target
    .since(now, { largestUnit: "seconds" })
    .total("seconds");

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "long",
  });

  for (const { unit, seconds } of THRESHOLDS) {
    const abs = Math.abs(diffSeconds);
    if (abs >= seconds || unit === "second") {
      const n = Math.round(abs / seconds);
      return rtf.format(diffSeconds > 0 ? n : -n, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "error";
}

interface PostProps {
  id: number;
  message: string;
  name: string;
  date: Temporal.Instant;
  hue: number;
}

function Post({ message, name, date, hue }: PostProps) {
  let [dur, setDur] = useState<Temporal.Duration | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(0);

  useEffect(() => {
    const update = () => {
      let now = Temporal.Now.instant();
      setDur(Temporal.Instant.from(date).since(now));
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
        <div className={styles.date}>
          {dur
            ? formatRelative(Temporal.Instant.from(date))
            : ""}
        </div>
      </div>
      <div className={styles.btmBit}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export { type PostProps };
export default Post;
