import React, { ReactNode } from "react";
import Header from "@/components/Header/Header";
import "./styles.scss";
import Footer from "@/components/Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
