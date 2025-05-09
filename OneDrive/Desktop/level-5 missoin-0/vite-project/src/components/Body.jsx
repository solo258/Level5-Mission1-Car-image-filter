import styles from "./Body.module.css";
import scrypt from "./scrypt.js";
import { useState } from "react";

export default function Body() {
  const [cardsData, setCardsData] = useState(scrypt);

  return (
    <main className={styles.body}>
      <div className={styles.hero}>
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Marketing Association New Zealand
          </h1>
          <div className={styles.logoImage}>
            <img src="./images/img 4.png" alt="Logo" />
          </div>
        </section>

        <section className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="How can we help you...."
          />
          <button className={styles.searchBtn}>Search</button>
        </section>
      </div>

      <section className={styles.cards}>
        {cardsData.map((card) => (
          <div>
            <div key={card.id} className={styles.image}>
              {<img src={card.image} alt={card.title} />}
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
