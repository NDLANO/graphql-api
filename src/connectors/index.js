/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// const { fetch } = require('../../utils/apiHelpers');

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

module.exports = {
  books,
};
