import React from "react";
import "./styles.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-title">Redsols Blog</span>
          <span className="brand-tagline">
            Thoughtful writing on technology, software, and beyond.
          </span>
        </div>
        <div className="footer-top">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Redsols</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
