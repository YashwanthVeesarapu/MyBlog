import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import "./styles.scss";

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
      <div className="content-page about-page">
        <section className="content-page__intro">
          <span className="eyebrow">About Redsols Blog</span>
          <h1>Practical writing for teams building modern products.</h1>
          <p>
            Redsols Blog is the company&apos;s editorial space for software
            engineering, product thinking, and the operational judgment behind
            reliable digital work.
          </p>
        </section>

        <section className="content-page__section">
          <h2>What we publish</h2>
          <p>
            We focus on clear, applied writing that helps readers make better
            decisions, ship more confidently, and stay grounded in real-world
            execution rather than hype.
          </p>
          <p>
            Every article is shaped by hands-on experience. The goal is not
            volume, but useful signal: practical ideas you can apply to your
            own product, engineering, or operational work.
          </p>
        </section>

        <section className="content-page__section">
          <h2>Who it is for</h2>
          <p>
            The readership spans product leaders, developers, founders, and
            stakeholders who want a steadier, more thoughtful perspective on
            technology and digital execution.
          </p>
          <p>
            If you value clarity, craft, and durable systems over noise, you
            are in the right place.
          </p>
        </section>

        <section className="content-page__contact">
          <h2>Contact</h2>
          <p>
            Reach out for collaboration, feedback, or thoughtful discussion.
          </p>
          <a href="mailto:blog@redsols.com">blog@redsols.com</a>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
