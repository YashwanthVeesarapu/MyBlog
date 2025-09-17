import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog by Redsols",
  description:
    "Explore the vibrant world of Redsols Blog, where insightful articles and engaging content come together to enlighten and entertain. From the latest trends to in-depth analyses, our blog covers a diverse range of topics, offering valuable insights and expert perspectives. Join us on a journey of discovery as we share knowledge, inspiration, and captivating stories. Redsols Blog – Your go-to destination for enriching content that goes beyond the ordinary.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-touch-icon.png" />
        <meta
          name="impact-site-verification"
          content="c05f4ee4-3f67-48bb-b824-df87f4073e24"
        />
        <meta property="og:title" content="Blog by Redsols" />
        <meta
          property="og:description"
          content="Explore the vibrant world of Redsols Blog."
        />
        <meta property="og:image" content="/path-to-image.jpg" />
        <link rel="canonical" href="https://blog.redsols.com" />
      </Head>
      <body className={inter.className}>{children}</body>
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3789101350622146"
        crossOrigin="anonymous"
      ></script> */}
      <GoogleAnalytics gaId="G-KZ56NVRBEB" />
    </html>
  );
}
