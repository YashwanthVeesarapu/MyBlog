import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import "./styles.scss";

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
      <div className="content-page">
        <section className="content-page__intro">
          <span className="eyebrow">Privacy</span>
          <h1>How Redsols handles information connected to this blog.</h1>
          <p>
            This page explains the categories of information we may collect,
            how that information is used, and the safeguards applied to it.
          </p>
        </section>

        <section className="content-page__section">
          <h2>Information we collect</h2>
          <ul>
            <li>Name, email address, and contact details you choose to share.</li>
            <li>Usage information such as log data, IP address, and device information.</li>
            <li>Any other information you voluntarily send to us.</li>
          </ul>
        </section>

        <section className="content-page__section">
          <h2>How we use it</h2>
          <ul>
            <li>To provide and maintain our services.</li>
            <li>To improve and personalize your experience.</li>
            <li>To respond to inquiries, comments, and feedback.</li>
            <li>To share relevant updates or promotional information when appropriate.</li>
          </ul>
        </section>

        <section className="content-page__section">
          <h2>Storage and security</h2>
          <p>
            Data is processed on our own servers. We take reasonable steps to
            protect confidentiality and security, while acknowledging that no
            internet transmission or electronic storage method is perfectly secure.
          </p>
        </section>

        <section className="content-page__contact">
          <h2>Questions</h2>
          <p>If you have questions about this policy, contact us directly.</p>
          <a href="mailto:blog@redsols.com">blog@redsols.com</a>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
