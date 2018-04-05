/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export const getEnvironmentVariabel = (
  key: string,
  fallback: string = undefined
) => {
  const variabel = process.env[key];
  return variabel || fallback;
};

export const port = getEnvironmentVariabel(process.env.PORT, '4000');
export const apiUrl = getEnvironmentVariabel(
  process.env.API_URL,
  'https://test.api.ndla.no'
);
