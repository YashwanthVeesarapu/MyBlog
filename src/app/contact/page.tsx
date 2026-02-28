import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Metadata } from "next";

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
      <p style={{ padding: "6em" }}> You can contact us at blog@redsols.com</p>
    </MainLayout>
  );
};

export default page;
