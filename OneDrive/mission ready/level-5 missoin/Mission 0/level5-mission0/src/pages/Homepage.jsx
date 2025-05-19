import styles from "./Homepage.module.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Card from "./components/Card";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <Header />
      <Body />
      <Card />
    </div>
  );
}
