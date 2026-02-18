import { useEffect, useRef, useState } from "react";
import { Temporal } from "temporal-polyfill";
import Post, { type PostProps } from "../Post/Post";
import styles from "./NotTwitter.module.css";

function sample<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * array.length)];
}

const names = ["Foo Bar", "John Foo", "Alice Bob", "I'm Notverygoodatcomingupwithnames", "Rhea Act"];
const message = () => ("lorem".repeat(Math.random() * 10 + 1));
const hue = () => (Math.floor(Math.random() * 361));
const time = () => (Temporal.Now.plainDateTimeISO().toString());

function NotTwitter() {
  let [post, setPost] = useState<PostProps[]>([]);
  let postCount = useRef(0);
  let postId = useRef(0); // same as count?

  let timeout = 0;
  useEffect(() => {
    const update = () => {
      let newItem: PostProps = {
        id: postId.current++,
        message: message(),
        name: sample(names),
        hue: hue(),
        date: time(),
      };
      setPost(arr => [newItem, ...arr]);
      postCount.current++;

      if (postCount.current < 20) {
        timeout = setTimeout(update, 500 + Math.random() * 1500);
      }
    };

    timeout = setTimeout(update, 500 + Math.random() * 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.wrapper}>
      <p>This is a demo of useEffect and Props.</p>

      {post.map((p) => <Post key={p.id} id={p.id} message={p.message} name={p.name} date={p.date} hue={p.hue} />)}
    </div>
  );
}

export default NotTwitter;
