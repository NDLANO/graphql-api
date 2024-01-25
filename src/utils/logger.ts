/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AsyncLocalStorage } from "node:async_hooks";
// eslint-disable-next-line import/no-duplicates
import Logger from "bunyan";
// eslint-disable-next-line import/no-duplicates
import bunyan from "bunyan";
import "source-map-support/register";

export const loggerStorage = new AsyncLocalStorage<Logger>();

const baseLogger = bunyan.createLogger({ name: "ndla-graphql-api" });

export function getLogger(): Logger {
  const storedLogger = loggerStorage.getStore();
  if (!storedLogger) {
    return baseLogger;
  }

  return storedLogger;
}

export default getLogger;
