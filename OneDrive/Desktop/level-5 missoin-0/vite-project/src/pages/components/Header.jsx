//
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on window resize
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

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
        {/* Hamburger only on mobile and when sidebar is closed */}
        {isMobile && !sidebarOpen && (
          <button
            className={styles.hamburgerBtn}
            onClick={toggleSidebar}
            aria-label="Open navigation"
          >
            <FontAwesomeIcon icon={faBars} className={styles.icon} />
          </button>
        )}

        {/* Sidebar: visible on desktop or when open on mobile */}
        {(sidebarOpen || !isMobile) && (
          <div
            className={`${styles.sidebar} ${
              sidebarOpen && isMobile ? styles.sidebarOpen : ""
            }`}
          >
            {/* Close icon only on mobile and when sidebar is open */}
            {isMobile && sidebarOpen && (
              <button
                className={styles.closeSidebarBtn}
                onClick={toggleSidebar}
                aria-label="Close navigation"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
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
        )}
      </section>
    </header>
  );
}
