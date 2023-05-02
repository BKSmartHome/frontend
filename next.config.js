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
    NEXT_PUBLIC_MQTT_URI: process.env.NEXT_PUBLIC_MQTT_URI,
    NEXT_PUBLIC_MQTT_USERNAME: process.env.NEXT_PUBLIC_MQTT_USERNAME,
    NEXT_PUBLIC_MQTT_PASSWORD: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
    NEXT_PUBLIC_MQTT_CLIENT_ID: process.env.NEXT_PUBLIC_MQTT_CLIENT_ID,
  },
});

/**
 * Hide warning of RecoilJS when hot reload
 */
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = nextConfig;
