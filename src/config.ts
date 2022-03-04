/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import dotenv from 'dotenv';
dotenv.config();

export function getEnvironmentVariabel(key: string, fallback: string): string;
export function getEnvironmentVariabel(key: string, fallback: boolean): boolean;
export function getEnvironmentVariabel(key: string, fallback?: string): string | undefined;
export function getEnvironmentVariabel(
  key: string,
  fallback?: string | boolean,
): string | boolean | undefined {
  const env = 'env';
  const variabel = process[env][key]; // Hack to prevent DefinePlugin replacing process.env
  return variabel || fallback;
}

export const ndlaEnvironment = getEnvironmentVariabel(
  'NDLA_ENVIRONMENT',
  'test',
);

const ndlaApiUrl = () => {
  const host = getEnvironmentVariabel('API_GATEWAY_HOST');
  if (!host) {
    switch (ndlaEnvironment) {
      case 'local':
        return 'http://api-gateway.ndla-local';
      case 'prod':
        return 'https://api.ndla.no';
      default:
        return `https://api.${ndlaEnvironment
          .toString()
          .replace('_', '-')}.ndla.no`;
    }
  } else {
    return `http://${host}`;
  }
};

const ndlaFrontendUrl = () => {
  switch (ndlaEnvironment) {
    case 'local':
      return 'http://localhost:3000';
    case 'prod':
      return 'https://ndla.no';
    default:
      return `https://${ndlaEnvironment.toString().replace('_', '-')}.ndla.no`;
  }
};

export const port = getEnvironmentVariabel('PORT', '4000');
export const apiUrl = getEnvironmentVariabel('API_URL', ndlaApiUrl());
export const localConverter = getEnvironmentVariabel('LOCAL_CONVERTER', false);
export const ndlaUrl = getEnvironmentVariabel('NDLA_URL', ndlaFrontendUrl());
export const uptimeOwner = getEnvironmentVariabel('UPTIME_OWNER', 'ghveem');
export const uptimeRepo = getEnvironmentVariabel('UPTIME_REPO', 'oppetid');
