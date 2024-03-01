import React from "react";
import Header from "../components/Header/Header";
import "./styles.scss";
import Footer from "@/components/Footer/Footer";

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
