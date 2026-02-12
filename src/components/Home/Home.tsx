import { type FeedItem as DomFeedItem } from "domutils";
import { type Feed, parseFeed } from "htmlparser2";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import FeedItem from "../FeedItem/FeedItem";
import styles from "./Home.module.css";

const getFeed = async () => {
  const resp = await fetch("/api/feed");
  const data: string = await resp.text();
  if (data === "not found") {
    return null;
  }
  const feed: Feed | null = parseFeed(data);
  return feed;
};

interface FavsState {
  favs: Array<string>;
  add: (slug: string) => void;
  del: (slug: string) => void;
}

const useFavs = create<FavsState>()(
  persist(
    (set) => ({
      favs: [],
      add: (slug: string) => set((state: FavsState) => ({ favs: [...state.favs, slug] })),
      del: (slug: string) => set((state: FavsState) => ({ favs: state.favs.filter(i => i !== slug) })),
    }),
    { name: "favs-store" },
  ),
);

function Home() {
  useEffect(() => {
    getFeed().then((feed) => {
      setFeed(feed);
      setLoading(false);
    });
  }, []);

  const [_loading, setLoading] = useState(true);
  const [feed, setFeed] = useState<Feed | null>(null);

  return (
    <div className={styles.wrapper}>
      <h2>Blog viewer</h2>

      <ul>
        {feed != null
          ? (feed?.items.map((item: DomFeedItem) => <FeedItem key={item.link} feed={item} />))
          : "Loading"}
      </ul>
    </div>
  );
}

export { Home, useFavs };
