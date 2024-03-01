import React from "react";
import "./styles.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="left">
        <Link href={"/"}>Blog</Link>
      </div>
      <div className="middle">
        <Link target="_blank" href={"https://www.redsols.us/"}>
          Redsols
        </Link>
      </div>
      <div className="right">
        <Link href={"/"}>Home</Link>
      </div>
    </header>
  );
};

export default Header;
