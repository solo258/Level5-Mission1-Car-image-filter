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
            <img
              src="https://cdn.thewirecutter.com/wp-content/media/2024/11/BEST-ALL-IN-ONE-COMPUTER-2048px-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"
              alt="Logo"
            />
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
