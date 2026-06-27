import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "../Icons/Logo";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/india", label: "India" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const Header: React.FC = () => {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <Link
          href="/"
          aria-label="Redsols Blog home"
          className={styles.siteHeaderBrand}
        >
          <Logo
            alt="Redsols Blog Logo"
            fill="currentColor"
            height="26px"
            width="auto"
          />
        </Link>

        <nav className={styles.siteHeaderNav} aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.siteHeaderNavLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a href="mailto:blog@redsols.com" className={styles.siteHeaderCta}>
          Write to us
        </a>
      </div>
    </header>
  );
};

export default Header;
