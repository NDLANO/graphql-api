/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export const getEnvironmentVariabel = (
  key: string,
  fallback: string | boolean = undefined,
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
      return `https://${ndlaEnvironment
        .toString()
        .replace('_', '-')}.api.ndla.no`;
  }
};

export const port = getEnvironmentVariabel('PORT', '4000');
export const apiUrl = getEnvironmentVariabel('API_URL', ndlaApiUrl());
export const localConverter = getEnvironmentVariabel('LOCAL_CONVERTER', false);
