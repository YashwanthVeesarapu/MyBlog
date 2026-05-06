import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "../Icons/Logo";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left} aria-hidden="true"></div>
      <div className={styles.middle}>
        <Link href={"/"} aria-label="Home">
          <Logo
            alt="Redsols Blog Logo"
            fill="#fff"
            height="35px"
            width="auto"
          />
        </Link>
      </div>
      <div className={styles.right} aria-hidden="true"></div>
    </header>
  );
};

export default Header;
