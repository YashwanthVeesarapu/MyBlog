import { useAuth } from "@/components/AuthProvider";
import React from "react";

import styles from "./auth-layout.module.scss";

const AuthLayout = (props: any) => {
  const auth = useAuth();

  return (
    <>
      <header className={styles.authHeader}>
        <h1>Admin Panel</h1>
        <nav>
          <a href="/">Home</a>

          {auth.user && (
            <button
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>
      <main>{props.children}</main>
    </>
  );
};

export default AuthLayout;
