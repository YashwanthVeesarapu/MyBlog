"use client";
1;
import { useEffect } from "react";
import "./styles.scss";

const CodeVerification = ({
  verifyCode,
}: {
  verifyCode: (code: string) => void;
}) => {
  useEffect(() => {
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
        verifyCode(code);
      });
  });

  return (
    <div className="verification" id="verification-div">
      <h2>Verification</h2>
      <form id="verification-form" className="content-area">
        <fieldset className="number-code">
          <legend>Security Code</legend>
          <div>
            <input name="code" className="code-input" required />
            <input name="code" className="code-input" required />
            <input name="code" className="code-input" required />
            <input name="code" className="code-input" required />
            <input name="code" className="code-input" required />
            <input name="code" className="code-input" required />
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CodeVerification;
