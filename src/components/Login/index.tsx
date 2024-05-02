import { apiInstance } from "@/utils/apiInstance";
import { useState } from "react";

import "./styles.scss";

const Login = () => {
  const [openVerificationModal, setOpenVerificationModal] = useState(false);

  const verifyCode = async (uid: string, token: string, code: string) => {
    if (code == null) {
      alert("Invalid code");
      return;
    }
    apiInstance
      .post("/users/verify-code", { uid, code, token })
      .then((res) => {
        console.log(res.data);
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
      .post("/users/login", { email, password })
      .then((res) => {
        console.log(res.data);

        let token = res.data.token;
        let uid = res.data.uid;

        if (res.data.message == "verify_code_now") {
          setOpenVerificationModal(true);

          let verificationDiv = document.getElementById("verification-div");
          if (verificationDiv) {
            verificationDiv.innerHTML = `
                <div>
                    <h2>Verification</h2>
                    <form id="verification-form" class="content-area">
                    <fieldset class='number-code'>
                        <legend>Security Code</legend>
                            <div>
                                <input name='code' class='code-input' required/>
                                <input name='code' class='code-input' required/>
                                <input name='code' class='code-input' required/>
                                <input name='code' class='code-input' required/>
                                <input name='code' class='code-input' required/>
                                <input name='code' class='code-input' required/>
                            </div>
                    </fieldset>
                    <input type="submit" />
                    </form>
                </div>
              `;

            let inputElements = document.querySelectorAll(
              ".code-input"
            ) as NodeListOf<HTMLInputElement>;

            inputElements.forEach((ele: HTMLInputElement, index: number) => {
              ele.addEventListener("keydown", (e: any) => {
                if (e.keyCode === 8 && e.target.value === "")
                  inputElements[Math.max(0, index - 1)].focus();
              });
              ele.addEventListener("input", (e: any) => {
                const [first, ...rest] = e.target.value;
                e.target.value = first ?? "";
                const lastInputBox = index === inputElements.length - 1;
                const didInsertContent = first !== undefined;
                if (didInsertContent && !lastInputBox) {
                  inputElements[index + 1].focus();
                  inputElements[index + 1].value = rest.join("");
                  inputElements[index + 1].dispatchEvent(new Event("input"));
                }
              });
            });

            document
              .getElementById("verification-form")
              ?.addEventListener("submit", (e) => {
                e.preventDefault();
                const code =
                  inputElements[0].value +
                  inputElements[1].value +
                  inputElements[2].value +
                  inputElements[3].value +
                  inputElements[4].value +
                  inputElements[5].value;
                verifyCode(uid, token, code);
              });
          }
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
    </div>
  );
};

export default Login;
