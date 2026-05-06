import React, { ReactNode } from "react";
import Header from "@/components/Header/Header";
import styles from "./main-layout.module.scss";
import Footer from "@/components/Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.siteMain}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
