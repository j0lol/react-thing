import { type Feed, parseFeed } from "htmlparser2";
import { useEffect, useState } from "react";
import CompFeedItem from "../FeedItem/FeedItem";
import styles from "./Home.module.css";

const getFeed = async () => {
	const resp = await fetch("/api/feed");
	const data: string = await resp.text();
	if (data === "not found") {
		return false;
	}
	const feed: Feed = parseFeed(data);
	console.log(feed);
	return feed;
};

function Home() {
	const [loading, setLoading] = useState(true);
	const [feed, setFeed] = useState(null);

	useEffect(() => {
		getFeed().then((feed) => setFeed(feed));
		setLoading(false);
	}, []);

	return (
		<div className={styles.wrapper}>
			<h2>Blog viewer</h2>

			<ul>
				{feed != null ? (feed !== false) ? (feed?.items.map((item) => {
						return CompFeedItem(item);
					})) : "Error fetching content" : "Loading" }
				
			</ul>
		</div>
	);
}

export default Home;
