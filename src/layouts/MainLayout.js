import React from "react";
import Header from "../components/Header/Header";
import "./styles.scss";
import Footer from "@/components/Footer/Footer";

const MainLayout = (props) => {
  return (
    <div className="main">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
