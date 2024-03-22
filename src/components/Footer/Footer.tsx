import React from "react";
import "./styles.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-top">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2019 Redsols</p>
      </div>
    </footer>
  );
};

export default Footer;
