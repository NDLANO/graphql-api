/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const DataLoader = require('dataloader');
const { articles } = require('./api');

function articlesLoader(context) {
  return new DataLoader(async articleIds => {
    return articles(articleIds, context);
  });
}

module.exports = {
  articlesLoader,
};
