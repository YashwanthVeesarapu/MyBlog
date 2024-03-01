import React from "react";
import "./styles.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <Link href="/about">About</Link>
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/terms">Terms of Service</Link>
    </footer>
  );
};

export default Footer;
