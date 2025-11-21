/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import dotenv from "dotenv";
dotenv.config();
import IPCIDR from "ip-cidr";

export function getEnvironmentVariabel(key: string, fallback: string): string;
export function getEnvironmentVariabel(key: string, fallback: boolean): boolean;
export function getEnvironmentVariabel(key: string, fallback?: string): string | undefined;
export function getEnvironmentVariabel(key: string, fallback?: string | boolean): string | boolean | undefined {
  const env = "env";
  const variabel = process[env][key]; // Hack to prevent DefinePlugin replacing process.env
  return variabel || fallback;
}

export const ndlaEnvironment = getEnvironmentVariabel("NDLA_ENVIRONMENT", "test");
export const environmentApiHost = `api.${ndlaEnvironment.toString().replace("_", "-")}.ndla.no`;

const ndlaApiUrl = () => {
  const host = getEnvironmentVariabel("API_GATEWAY_HOST");
  if (!host) {
    switch (ndlaEnvironment) {
      case "local":
        return "http://api-gateway.ndla-local";
      case "prod":
        return "https://api.ndla.no";
      default:
        return `https://${environmentApiHost}`;
    }
  } else {
    return `http://${host}`;
  }
};

const ndlaFrontendUrl = () => {
  switch (ndlaEnvironment) {
    case "local":
      return "http://localhost:3000";
    case "prod":
      return "https://ndla.no";
    default:
      return `https://${ndlaEnvironment.toString().replace("_", "-")}.ndla.no`;
  }
};

export const h5pHostUrl = () => {
  const h5pHost = process.env.H5P_HOST;
  if (!h5pHost) {
    switch (process.env.NDLA_ENVIRONMENT) {
      case "prod":
        return "https://h5p.ndla.no";
      default:
        return `https://h5p-${ndlaEnvironment.toString().replace("_", "-") || "test"}.ndla.no`;
    }
  } else {
    return h5pHost;
  }
};

export const cacheTime = getEnvironmentVariabel("CACHE_TIME", "60");
export const defaultLanguage = getEnvironmentVariabel("DEFAULT_LANGUAGE", "nb");
export const port = getEnvironmentVariabel("PORT", "4000");
export const apiUrl = getEnvironmentVariabel("API_URL", ndlaApiUrl());
export const ndlaUrl = getEnvironmentVariabel("NDLA_URL", ndlaFrontendUrl());
export const uptimeOwner = getEnvironmentVariabel("UPTIME_OWNER", "NDLANO");
export const uptimeRepo = getEnvironmentVariabel("UPTIME_REPO", "oppetid");
export const uptimeToken = getEnvironmentVariabel("UPTIME_API_TOKEN", undefined);
export const googleApiKey = getEnvironmentVariabel("NDLA_GOOGLE_API_KEY", undefined);
export const slowLogTimeout = getEnvironmentVariabel("SLOW_LOG_TIMEOUT", "500");
export const gracePeriodSeconds = parseInt(getEnvironmentVariabel("READINESS_PROBE_DETECTION_SECONDS", "7"));

const unparsedIpRanges = getEnvironmentVariabel(
  "IP_RANGES",
  "oslo=171.23.0.0/16;akershus=148.82.0.0/16;vestland=109.70.80.0/21,109.70.85.0/24",
);

export const ipRanges = unparsedIpRanges.split(";").reduce<Map<string, IPCIDR[]>>((acc, range) => {
  const [county, ipRange] = range.split("=");
  if (!county || !ipRange) throw new Error("Invalid IP_RANGES format");
  const ranges = ipRange.split(",");
  acc.set(
    county,
    ranges.map((range) => new IPCIDR(range)),
  );
  return acc;
}, new Map<string, IPCIDR[]>());
