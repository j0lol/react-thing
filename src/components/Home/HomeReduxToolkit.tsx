import { type FeedItem as DomFeedItem } from "domutils";
import { type Feed, parseFeed } from "htmlparser2";
import { useEffect, useState } from "react";
import FeedItemRedux from "../FeedItemRedux/FeedItem";
import styles from "./Home.module.css";

import { configureStore, type PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

interface FavsStateRedux {
  favs: Array<string>;
}
const initialState: FavsStateRedux = {
  favs: [],
};

export const favsSlice = createSlice({
  name: "favs-redux",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.favs = [...state.favs, action.payload];
    },
    del: (state, action: PayloadAction<string>) => {
      state.favs = state.favs.filter(i => i !== action.payload);
    },
  },
});

const { add: addFav, del: delFav } = favsSlice.actions;
export { addFav, delFav };

export const store = configureStore({
  reducer: {
    favs: favsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const getFeed = async () => {
  const resp = await fetch("/api/feed");
  const data: string = await resp.text();
  if (data === "not found") {
    return null;
  }
  const feed: Feed | null = parseFeed(data);
  return feed;
};

function HomeReduxToolkit() {
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

      <Provider store={store}>
        <ul>
          {feed != null
            ? (feed?.items.map((item: DomFeedItem) => <FeedItemRedux key={item.link} feed={item} />))
            : "Loading"}
        </ul>
      </Provider>
    </div>
  );
}

export { type FavsStateRedux, HomeReduxToolkit };
