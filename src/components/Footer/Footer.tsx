import React from "react";
import "./styles.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="eyebrow">Redsols Journal</span>
          <h2>Thoughtful writing for software teams and product builders.</h2>
          <p>
            Thoughtful articles on software engineering, product judgment, and
            the practical side of building reliable digital systems.
          </p>
        </div>

        <div className="site-footer__links">
          <div className="site-footer__group">
            <span className="site-footer__label">Explore</span>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="site-footer__group">
            <span className="site-footer__label">Info</span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href="mailto:blog@redsols.com">blog@redsols.com</a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Redsols. Clear thinking, published plainly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
