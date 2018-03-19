/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const getEnvironmentVariabel = (key, fallback = undefined) => {
  const variabel = process.env[key];
  return variabel || fallback;
};

module.exports = {
  getEnvironmentVariabel,
  port: process.env.PORT || '4000',
  apiUrl: process.env.API_URL || 'https://test.api.ndla.no',
};
