import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import styles from "./terms.module.scss";

export const metadata: Metadata = {
  title: "Terms of Service | Blog by Redsols",
  description:
    "Terms of Service for Redsols Blog. Read our terms and conditions for using our services and accessing our content.",
  alternates: {
    canonical: "https://blog.redsols.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Blog by Redsols",
    description:
      "Terms of Service for Redsols Blog - terms and conditions for using our services.",
    url: "https://blog.redsols.com/terms",
    siteName: "Blog by Redsols",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Blog by Redsols",
    description:
      "Terms of Service for Redsols Blog - terms and conditions for using our services.",
  },
};

const page = () => {
  return (
    <MainLayout>
      <div className={styles.termsPage}>
        <section className={styles.intro}>
          <span className={styles.eyebrow}>Policy</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lead}>
            By using our services, you agree to the following terms and
            conditions. Please read them carefully before using our site.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p className={styles.text}>
            By accessing or using our services, you agree to be bound by these
            terms. If you do not agree, do not use our services.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. User Responsibilities</h2>
          <ul className={styles.list}>
            <li>Do not violate applicable laws or regulations.</li>
            <li>Do not interfere with the proper functioning of the service.</li>
            <li>Do not compromise the security of our systems.</li>
            <li>Do not submit false or misleading information.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Changes</h2>
          <p className={styles.text}>
            We may update these terms at any time. Continued use of the service
            means you accept the updated terms.
          </p>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.text}>
            Questions? Email <a href="mailto:blog@redsols.com">blog@redsols.com</a>.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
