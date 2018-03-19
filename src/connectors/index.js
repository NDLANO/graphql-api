/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const { fetch } = require('../utils/apiHelpers');

async function books() {
  let promise = new Promise(function(resolve) {
    setTimeout(resolve, 100, [
      {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
      },
      {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
      },
    ]);
  });

  return promise;
}

async function resource(resourceId, context) {
  const response = await fetch(`/taxonomy/v1/resources/${resourceId}/`, {
    headers: { Authorization: `Bearer ${context.token.access_token}` },
  });
  const json = await response.json();
  return json;
}

module.exports = {
  books,
  resource,
};
