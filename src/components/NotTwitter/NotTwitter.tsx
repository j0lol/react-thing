import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import Post, { type PostProps } from "../Post/Post";
import styles from "./NotTwitter.module.css";

function sample<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * array.length)];
}

const names = ["Foo Bar", "John Foo", "Alice Bob", "I'm Notverygoodatcomingupwithnames", "Rhea Act"];
const message = () => ("lorem".repeat(Math.random() * 10 + 1));
const hue = () => (Math.floor(Math.random() * 361));

function NotTwitter() {
  let [post, setPost] = useState<PostProps[]>([]);

  let timeout = 0;
  useEffect(() => {
    const update = () => {
      let newItem: PostProps = {
        message: message(),
        name: sample(names),
        hue: hue(),
        date: Temporal.Now.plainDateTimeISO(),
      };
      setPost(arr => [newItem, ...arr]);
      console.log(post);

      if (post.length < 20) {
        timeout = setTimeout(update, 500 + Math.random() * 1500);
      }
    };

    timeout = setTimeout(update, 500 + Math.random() * 1500);

    return () => clearTimeout(timeout);
  });

  return (
    <div className={styles.wrapper}>
      <p>This is a demo of useEffect and Props.</p>

      {post.map((p) => <Post message={p.message} name={p.name} date={p.date} hue={p.hue} />)}
    </div>
  );
}

export default NotTwitter;
