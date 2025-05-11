import { useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
            src="./images/img 5.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.logo}>Marketing Association New Zealand</div>
      </section>

      <section className={styles.navBarSection}>
        <button className={styles.hamburgerBtn} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </button>
        <div
          className={`${styles.sidebar} ${
            sidebarOpen ? styles.sidebarOpen : ""
          }`}
        >
          <button className={styles.closeSidebarBtn} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <nav className={styles.nav}>
            <Link to={"/Home"} className={styles.navItem}>
              Home
            </Link>
            <Link to={"/About"} className={styles.navItem}>
              About
            </Link>
            <Link to={"/Services"} className={styles.navItem}>
              Services
            </Link>
          </nav>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </section>
    </header>
  );
}
