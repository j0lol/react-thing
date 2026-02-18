import { type FeedItem } from "domutils";
import { useDispatch, useSelector } from "react-redux";
import { addFav, delFav, type RootState } from "../Home/HomeReduxToolkit";
import styles from "./FeedItem.module.css";

export default function FeedItemRedux({ feed }: { feed: FeedItem }) {
  const slug = feed.link!.replace("https://j0.lol/blog/", "");

  const favs: string[] = useSelector((state: RootState) => state.favs.favs);
  const dispatch = useDispatch();

  return (
    <div className={styles.item}>
      <span className={styles.title}>{feed.title}</span>
      <a href={feed.link}>{slug}</a>

      {!favs.includes(slug)
        ? (
          <button
            type="button"
            className={styles.fav}
            onClick={() => dispatch(addFav(slug))}
          >
            Favorite
          </button>
        )
        : (
          <button
            type="button"
            className={styles.unfav}
            onClick={() => dispatch(delFav(slug))}
          >
            Unfavorite
          </button>
        )}
    </div>
  );
}
