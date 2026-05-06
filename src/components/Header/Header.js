import React from "react";
import "./styles.scss";
import Link from "next/link";
import Logo from "../Icons/Logo";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" aria-label="Redsols Blog home" className="site-header__brand">
          <Logo
            alt="Redsols Blog Logo"
            fill="currentColor"
            height="26px"
            width="auto"
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <a href="mailto:blog@redsols.com" className="site-header__cta">
          Write to us
        </a>
      </div>
    </header>
  );
};

export default Header;
