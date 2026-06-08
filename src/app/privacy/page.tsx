import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import styles from "./privacy.module.scss";

export const metadata: Metadata = {
  title: "Privacy Policy | Blog by Redsols",
  description:
    "Privacy Policy for Redsols Blog. Learn how we collect, use, and protect your personal information when you use our services.",
  alternates: {
    canonical: "https://blog.redsols.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Blog by Redsols",
    description:
      "Privacy Policy for Redsols Blog - learn how we handle your personal information.",
    url: "https://blog.redsols.com/privacy",
    siteName: "Blog by Redsols",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Blog by Redsols",
    description:
      "Privacy Policy for Redsols Blog - learn how we handle your personal information.",
  },
};

const page = () => {
  return (
    <MainLayout>
      <div className={styles.privacyPage}>
        <section className={styles.intro}>
          <span className={styles.eyebrow}>Policy</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lead}>
            This policy explains how we collect, use, and handle personal
            information when you use our services or visit our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <p className={styles.text}>We may collect:</p>
          <ul className={styles.list}>
            <li>Your name, email address, and contact details.</li>
            <li>
              Usage information such as log data, IP address, and device
              details.
            </li>
            <li>Any other information you choose to provide voluntarily.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
          <ul className={styles.list}>
            <li>To provide and maintain our services.</li>
            <li>To improve, personalize, and enhance your experience.</li>
            <li>To respond to inquiries, comments, or feedback.</li>
            <li>To send updates, promotions, and other relevant information.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Security</h2>
          <p className={styles.text}>
            We take reasonable measures to protect your personal information,
            but no method of transmission or storage is completely secure.
          </p>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>Questions</h2>
          <p className={styles.text}>
            If you have questions, contact us at{" "}
            <a href="mailto:blog@redsols.com">blog@redsols.com</a>.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
