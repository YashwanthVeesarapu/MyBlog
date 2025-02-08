import React from "react";
import "./styles.scss";
import Link from "next/link";
import Logo from "../Icons/Logo";

const Header = () => {
  return (
    <header>
      <div className="left"></div>
      <div className="middle">
        {/* <Link target="_blank" href={"https://www.redsols.com/"}>
          Redsols
        </Link> */}

        <Link href={"/"}>
          <Logo
            alt="Redsols Blog Logo"
            fill="#fff"
            height="35px"
            width="auto"
          />
        </Link>
      </div>
      <div className="right">
        {/* <Link target="_blank" href={"https://www.redsols.com/"}>
          Redsols
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
