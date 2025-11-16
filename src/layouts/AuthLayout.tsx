import { useAuth } from "@/components/AuthProvider";
import React from "react";

import "./styles.scss";

const AuthLayout = (props: any) => {
  const auth = useAuth();

  return (
    <>
      <header className="auth-header">
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
