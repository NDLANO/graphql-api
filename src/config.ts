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
      return `https://${ndlaEnvironment}.api.ndla.no`;
  }
};

const getAuth0Hostname = () => {
  switch (ndlaEnvironment) {
    case 'prod':
      return 'ndla.eu.auth0.com';
    case 'staging':
      return 'ndla-staging.eu.auth0.com';
    default:
      return 'ndla-test.eu.auth0.com';
  }
};

export const port = getEnvironmentVariabel('PORT', '4000');
export const apiUrl = getEnvironmentVariabel('API_URL', ndlaApiUrl());
export const localConverter = getEnvironmentVariabel('LOCAL_CONVERTER', false);
export const auth0Hostname = getAuth0Hostname();
