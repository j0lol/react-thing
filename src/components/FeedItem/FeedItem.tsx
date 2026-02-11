import type { FeedItem as RssFeedItem } from "htmlparser2";
import styles from "./FeedItem.module.css";


export default function FeedItem(feed: RssFeedItem) {
	return <div className={styles.item}>
		<span className={styles.title}>{feed.title}</span>
		<a href={feed.link}>{feed.link.replace("https://j0.lol/blog/", "")}</a>
		
		
		<button className={styles.fav}type="button">Favorite</button>
	</div>;
}
