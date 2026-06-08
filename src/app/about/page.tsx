import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "About Us | Blog by Redsols",
  description:
    "Learn about Redsols Blog - a knowledge hub sharing practical insights, research-driven perspectives, and guidance on software engineering, product thinking, and productivity.",
  alternates: {
    canonical: "https://blog.redsols.com/about",
  },
  openGraph: {
    title: "About Us | Blog by Redsols",
    description:
      "Learn about Redsols Blog - a knowledge hub sharing practical insights and guidance on modern technology.",
    url: "https://blog.redsols.com/about",
    siteName: "Blog by Redsols",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Blog by Redsols",
    description:
      "Learn about Redsols Blog - a knowledge hub sharing practical insights and guidance on modern technology.",
  },
};

const page = () => {
  return (
    <MainLayout>
      <div className={styles.aboutPage}>
        <section className={styles.intro}>
          <span className={styles.eyebrow}>About</span>
          <h1 className={styles.title}>Thoughtful writing from Redsols.</h1>
          <p className={styles.lead}>
            Redsols Blog shares practical insights, research-driven
            perspectives, and guidance for teams navigating modern technology
            and digital work.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What we publish</h2>
          <p className={styles.text}>
            Our focus is clear, actionable content across software engineering,
            product thinking, and productivity. We aim to help readers make
            better decisions, build reliable solutions, and stay current in a
            fast-moving industry.
          </p>
          <p className={styles.text}>
            Every article is shaped by real-world experience and a commitment
            to quality. We prioritize clarity over hype and keep the writing
            useful for both individual contributors and leaders.
          </p>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.text}>
            Reach us at <a href="mailto:blog@redsols.com">blog@redsols.com</a>
            for collaboration, suggestions, or questions.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
