import styles from "./SiteFooter.module.css";

function SiteFooter() {
  return (
    <div className={styles.wrapper}>
      &copy; Jo Burnett &mdash; &nbsp; <a href="https://github.com/j0lol/react-thing">GitHub</a>
    </div>
  );
}

export default SiteFooter;
