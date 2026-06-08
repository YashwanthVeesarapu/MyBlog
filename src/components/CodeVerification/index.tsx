"use client";
import { useEffect } from "react";
import styles from "./code-verification.module.scss";

const CodeVerification = ({
  verifyCode,
}: {
  verifyCode: (code: string) => void;
}) => {
  useEffect(() => {
    const inputElements = document.querySelectorAll(
      `.${styles.codeInput}`
    ) as NodeListOf<HTMLInputElement>;
    const form = document.getElementById("verification-form");
    const keydownHandlers: Array<(e: KeyboardEvent) => void> = [];
    const inputHandlers: Array<(e: Event) => void> = [];

    if (!form || inputElements.length === 0) {
      return;
    }

    inputElements.forEach((ele: HTMLInputElement, index: number) => {
      const onKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        if (e.key === "Backspace" && target.value === "") {
          inputElements[Math.max(0, index - 1)].focus();
        }
      };

      const onInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const first = target.value.charAt(0);
        const rest = target.value.slice(1);
        target.value = first ?? "";
        const lastInputBox = index === inputElements.length - 1;
        const didInsertContent = first !== "";
        if (didInsertContent && !lastInputBox) {
          inputElements[index + 1].focus();
          inputElements[index + 1].value = rest;
          inputElements[index + 1].dispatchEvent(new Event("input"));
        }
      };

      ele.addEventListener("keydown", onKeyDown);
      ele.addEventListener("input", onInput);
      keydownHandlers.push(onKeyDown);
      inputHandlers.push(onInput);
    });

    const onSubmit = (e: Event) => {
      e.preventDefault();
      const code =
        inputElements[0].value +
        inputElements[1].value +
        inputElements[2].value +
        inputElements[3].value +
        inputElements[4].value +
        inputElements[5].value;
      verifyCode(code);
    };

    form.addEventListener("submit", onSubmit);

    return () => {
      inputElements.forEach((ele, index) => {
        ele.removeEventListener("keydown", keydownHandlers[index]);
        ele.removeEventListener("input", inputHandlers[index]);
      });
      form.removeEventListener("submit", onSubmit);
    };
  }, [verifyCode]);

  return (
    <div className={styles.verification} id="verification-div">
      <h2>Verification</h2>
      <form id="verification-form" className="content-area">
        <fieldset className={styles.numberCode}>
          <legend>Security Code</legend>
          <div>
            <input name="code" className={styles.codeInput} type="text" inputMode="numeric" required />
            <input name="code" className={styles.codeInput} type="text" inputMode="numeric" required />
            <input name="code" className={styles.codeInput} type="text" inputMode="numeric" required />
            <input name="code" className={styles.codeInput} type="text" inputMode="numeric" required />
            <input name="code" className={styles.codeInput} type="text" inputMode="numeric" required />
            <input name="code" className={styles.codeInput} type="text" inputMode="numeric" required />
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CodeVerification;
