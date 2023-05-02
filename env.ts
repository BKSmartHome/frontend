/**
 * This file will export all env with typing for app to use
 * Flow: Add into .env => bind into next.config => export in env.ts
 */

import getConfig from "next/config";

interface IRuntimeConfig {
  IS_DEV: boolean;
  TEAM_NAME: string;
  API_URL: string;
  ACCESS_JWT_SECRET: string;
  NEXT_PUBLIC_MQTT_URI: string;
  NEXT_PUBLIC_MQTT_USERNAME: string;
  NEXT_PUBLIC_MQTT_PASSWORD: string;
  NEXT_PUBLIC_MQTT_CLIENT_ID: string;
}

const { publicRuntimeConfig } = getConfig();

/**
 * True if running in production
 */
export const {
  IS_DEV = false,
  TEAM_NAME,
  API_URL,
  ACCESS_JWT_SECRET,
  NEXT_PUBLIC_MQTT_URI,
  NEXT_PUBLIC_MQTT_USERNAME,
  NEXT_PUBLIC_MQTT_PASSWORD,
  NEXT_PUBLIC_MQTT_CLIENT_ID,
} = publicRuntimeConfig as IRuntimeConfig;
