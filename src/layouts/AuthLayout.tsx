import { useAuth } from "@/components/AuthProvider";
import React from "react";

import "./styles.scss";

const AuthLayout = (props: any) => {
  const auth = useAuth();

  return (
    <>
      <header className="auth-header">
        <h1>Admin</h1>
        {auth.user && (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </header>
      <main>{props.children}</main>
    </>
  );
};

export default AuthLayout;
