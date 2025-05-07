import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className={styles.header}>
      <section className={styles.logoSection}>
        <div>
          <img
            src="https://helpx.adobe.com/content/dam/help/en/lightroom/how-to/organize-edit-share-photos-online_297x176.jpg"
            alt="Logo"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.logo}>Marketing Association New Zealand</div>
      </section>

      <section className={styles.navBarSection}>
        <button className={styles.hamburgerBtn} onClick={toggleSidebar}>
          ☰
        </button>
        <div
          className={`${styles.sidebar} ${
            sidebarOpen ? styles.sidebarOpen : ""
          }`}
        >
          <button className={styles.closeSidebarBtn} onClick={toggleSidebar}>
            ✕
          </button>
          <nav className={styles.nav}>
            <a href="#Home" className={styles.navItem}>
              Home
            </a>
            <a href="#About" className={styles.navItem}>
              About
            </a>
            <a href="#Services" className={styles.navItem}>
              Services
            </a>
          </nav>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </section>
    </header>
  );
}
