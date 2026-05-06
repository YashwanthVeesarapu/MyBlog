import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterInner}>
        <div className={styles.siteFooterBrand}>
          <span className={styles.eyebrow}>Redsols Journal</span>
          <h2>Thoughtful writing for software teams and product builders.</h2>
          <p>
            Thoughtful articles on software engineering, product judgment, and
            the practical side of building reliable digital systems.
          </p>
        </div>

        <div className={styles.siteFooterLinks}>
          <div className={styles.siteFooterGroup}>
            <span className={styles.siteFooterLabel}>Explore</span>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.siteFooterGroup}>
            <span className={styles.siteFooterLabel}>Info</span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href="mailto:blog@redsols.com">blog@redsols.com</a>
          </div>
        </div>

        <div className={styles.siteFooterBottom}>
          <p>
            &copy; {new Date().getFullYear()} Redsols. Clear thinking,
            published plainly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
