import { useState, useEffect } from "react";

import "./styles.scss";
import { apiInstance } from "@/services";
import CodeVerification from "../CodeVerification";

const Login = () => {
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [userData, setUserData] = useState({
    uid: "",
    token: "",
  } as {
    uid: string;
    token: string;
  });

  const handleOAuthRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const base = apiInstance.defaults.baseURL || "";
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    const authorizeUrl = `${base}/auth/authorize?redirect_uri=${redirectUri}&response_type=code&client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`;
    window.location.assign(authorizeUrl);
  };

  const verifyCode = async (code: string) => {
    if (code == null) {
      alert("Invalid code");
      return;
    }
    let uid = userData.uid;
    let token = userData.token;
    apiInstance
      .post("/blog/auth/verify-code", { uid, code, token })
      .then((res) => {
        if (res.data.message == "code_verified") {
          window.location.reload();
          alert("Account verified");
        } else {
          alert("Invalid code");
        }
        setOpenVerificationModal(false);
      })
      .catch((err) => {
        alert("Invalid code");
      });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await apiInstance
      .post("/blog/auth/login", { email, password })
      .then((res) => {
        let token = res.data.token;
        let uid = res.data.uid;

        setUserData({ token, uid });

        if (res.data.message == "verify_code_now") {
          setOpenVerificationModal(true);
        }
      })
      .catch((err) => {
        alert("Invalid credentials");
      });
  };

  return (
    <div>
      <div className="verification" id="verification-div"></div>

      {!openVerificationModal && (
        <div className="login">
          <h2>Login</h2>

          <div className="oauth-section">
            <button className="oauth-button" onClick={handleOAuthRedirect}>
              Login with Redsols OAuth
            </button>
            <div className="divider">
              <span>or</span>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <label htmlFor="login-email" className="visually-hidden">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
            />
            <label htmlFor="login-password" className="visually-hidden">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      )}

      {openVerificationModal && (
        <CodeVerification verifyCode={(code: string) => verifyCode(code)} />
      )}
    </div>
  );
};

export default Login;
