import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.brandTitle}>Redsols Blog</span>
          <span className={styles.brandTagline}>
            Thoughtful writing on technology, software, and beyond.
          </span>
        </div>
        <div className={styles.footerTop}>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Redsols</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
