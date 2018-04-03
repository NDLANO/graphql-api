/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const fetch = require('node-fetch');
const config = require('../config');

const apiBaseUrl = (() => {
  // if (process.env.NODE_ENV === 'test') {
  //   return 'http://some-api';
  // }
  return config.apiUrl;
})();

function apiResourceUrl(path) {
  return apiBaseUrl + path;
}

async function fetchHelper(path, context, options) {
  return fetch(apiResourceUrl(path), {
    headers: {
      Authorization: `Bearer ${context.token.access_token}`,
    },
    ...options,
  });
}

module.exports = {
  fetch: fetchHelper,
};
