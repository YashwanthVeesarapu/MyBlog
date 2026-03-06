/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "dist",
  transpilePackages: ["isomorphic-dompurify", "@exodus/bytes"],
};

module.exports = nextConfig;
