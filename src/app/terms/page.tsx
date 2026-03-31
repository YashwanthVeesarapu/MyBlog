import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

import "./styles.scss";

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
      <div className="content-page">
        <section className="content-page__intro">
          <span className="eyebrow">Terms</span>
          <h1>Ground rules for using Redsols Blog and its published content.</h1>
          <p>
            Accessing or using this site means agreeing to the terms below. If
            these terms do not work for you, do not use the service.
          </p>
        </section>

        <section className="content-page__section">
          <h2>Acceptance and use</h2>
          <p>
            By using this site, you agree to comply with applicable laws and to
            use the service in a way that does not interfere with its normal operation.
          </p>
        </section>

        <section className="content-page__section">
          <h2>User responsibilities</h2>
          <ul>
            <li>Do not violate laws or regulations through your use of the site.</li>
            <li>Do not disrupt the operation or security of the service.</li>
            <li>Do not submit false or misleading information.</li>
          </ul>
        </section>

        <section className="content-page__section">
          <h2>Intellectual property and privacy</h2>
          <p>
            Site content, including text, graphics, logos, images, and software,
            remains the property of Redsols unless stated otherwise and is
            protected by applicable intellectual property laws.
          </p>
          <p>
            Use of the service is also governed by the Privacy Policy published on this site.
          </p>
        </section>

        <section className="content-page__contact">
          <h2>Questions</h2>
          <p>For questions about these terms, contact us at:</p>
          <a href="mailto:blog@redsols.com">blog@redsols.com</a>
        </section>
      </div>
    </MainLayout>
  );
};

export default page;
