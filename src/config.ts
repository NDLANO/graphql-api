/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export const getEnvironmentVariabel = (
  key: string,
  fallback: string = undefined,
) => {
  const variabel = process.env[key];
  return variabel || fallback;
};

const ndlaEnvironment = getEnvironmentVariabel('NDLA_ENVIRONMENT', 'test');

const ndlaApiUrl = () => {
  switch (ndlaEnvironment) {
    case 'local':
      return 'http://api-gateway.ndla-local';
    case 'prod':
      return 'https://api.ndla.no';
    default:
      return `https://${ndlaEnvironment}.api.ndla.no`;
  }
};

export const port = getEnvironmentVariabel(process.env.PORT, '4000');
export const apiUrl = getEnvironmentVariabel(process.env.API_URL, ndlaApiUrl());
