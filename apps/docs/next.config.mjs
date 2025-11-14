import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

export default withNextra({
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/uwdsc-website-v3" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/uwdsc-website-v3/" : "",
  reactStrictMode: true,
});
