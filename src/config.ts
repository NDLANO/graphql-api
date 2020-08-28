/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import dotenv from 'dotenv';
dotenv.config();

export const getEnvironmentVariabel = (
  key: string,
  fallback: string | boolean = undefined,
) => {
  const variabel = process.env[key];

  return variabel || fallback;
};

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
export const grepUrl = getEnvironmentVariabel(
  'NDLA_GREP_URL',
  'https://data.udir.no',
);
