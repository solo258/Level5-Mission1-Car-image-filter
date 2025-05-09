import styles from "./Card.module.css";
import scrypt from "./scrypt.js";
import { useState } from "react";

export default function Card() {
  const [cardsData, setCardsData] = useState(scrypt);

  return (
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
  );
}
