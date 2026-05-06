import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import "./styles.scss";

export const metadata: Metadata = {
  title: "Contact Us | Blog by Redsols",
  description:
    "Get in touch with the Redsols Blog team. Contact us for collaborations, suggestions, or inquiries at blog@redsols.com.",
  alternates: {
    canonical: "https://blog.redsols.com/contact",
  },
  openGraph: {
    title: "Contact Us | Blog by Redsols",
    description:
      "Get in touch with the Redsols Blog team for collaborations and inquiries.",
    url: "https://blog.redsols.com/contact",
    siteName: "Blog by Redsols",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Blog by Redsols",
    description:
      "Get in touch with the Redsols Blog team for collaborations and inquiries.",
  },
};

const page = () => {
  return (
    <MainLayout>
      <div className="content-page">
        <section className="content-page__intro">
          <span className="eyebrow">Contact</span>
          <h1>Start a conversation with the Redsols team.</h1>
          <p>
            Use the address below for collaboration, article feedback, or
            general inquiries related to the blog.
          </p>
        </section>

        <section className="content-page__contact">
          <h2>Email</h2>
          <p>We read and respond to thoughtful messages.</p>
          <a href="mailto:blog@redsols.com">blog@redsols.com</a>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
