import React from "react";
import "./styles.scss";
import Link from "next/link";
import Logo from "../Icons/Logo";

const Header: React.FC = () => {
  return (
    <header>
      <div className="left" aria-hidden="true"></div>
      <div className="middle">
        <Link href={"/"} aria-label="Home">
          <Logo
            alt="Redsols Blog Logo"
            fill="#fff"
            height="35px"
            width="auto"
          />
        </Link>
      </div>
      <div className="right" aria-hidden="true"></div>
    </header>
  );
};

export default Header;
