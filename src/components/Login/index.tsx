import { useState } from "react";

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
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: res.data.uid,
              token: res.data.token,
            })
          );
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
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="submit" />
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
