import styles from "./Body.module.css";

export default function Body() {
  return (
    <main className={styles.body}>
      <div className={styles.hero}>
        {/* <section className={styles.heroSection}> */}
        <h1 className={styles.heroTitle}>Marketing Association New Zealand</h1>
        {/* <div className={styles.logoImage}>
            <img src="./images/img 4.png" alt="Logo" />
          </div> */}
        {/* </section> */}

        <section className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="How can we help you...."
          />
          <button className={styles.searchBtn}>Search</button>
        </section>
      </div>
    </main>
  );
}
