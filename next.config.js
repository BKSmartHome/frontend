/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const intercept = require("intercept-stdout");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["assets.laligagolazos.com"],
  },
  publicRuntimeConfig: {
    TEAM_NAME: process.env.TEAM_NAME || "UNKNOWN",
    IS_DEV: process.env.NODE_ENV !== "production",
    API_URL: process.env.API_URL || "localhost:8000",
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
  },
});

/**
 * Hide warning of RecoilJS when hot reload
 */
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = nextConfig;
