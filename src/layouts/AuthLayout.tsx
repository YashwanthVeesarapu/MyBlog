import React from "react";

const AuthLayout = (props: any) => {
  return (
    <>
      <header>
        <h1>Admin</h1>
        <main>{props.children}</main>
      </header>
    </>
  );
};

export default AuthLayout;
