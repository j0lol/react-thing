import { type FeedItem } from "domutils";
import { useFavs } from "../Home/Home";
import styles from "./FeedItem.module.css";

export default function FeedItem({ feed }: { feed: FeedItem }) {
  const slug = feed.link!.replace("https://j0.lol/blog/", "");
  const addFav = useFavs((state) => state.add);
  const delFav = useFavs((state) => state.del);
  const favs = useFavs((state) => state.favs);

  return (
    <div className={styles.item}>
      <span className={styles.title}>{feed.title}</span>
      <a href={feed.link}>{slug}</a>

      {!favs.includes(slug)
        ? (
          <button
            type="button"
            className={styles.fav}
            onClick={() => addFav(slug)}
          >
            Favorite
          </button>
        )
        : (
          <button
            type="button"
            className={styles.unfav}
            onClick={() => delFav(slug)}
          >
            Unfavorite
          </button>
        )}
    </div>
  );
}
