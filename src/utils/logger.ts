/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { createLogger, transports, format, Logger } from "winston";
import "source-map-support/register";

export const loggerStorage = new AsyncLocalStorage<Logger>();

const developmentErrFormat = format.printf(({ level, message, stack, requestPath, timestamp }) => {
  const stackString = stack ? `\n${stack}` : "";
  const requestPathStr = requestPath ? `${requestPath} ` : "";
  return `${timestamp} [${level}] ${requestPathStr}${message}${stackString}`;
});

const developmentFormat = format.combine(format.timestamp(), developmentErrFormat);
const jsonFormat = format.combine(format.timestamp(), format.errors({ stack: true }), format.json());

export const buildLogger = (extraMeta: Record<string, string>) => {
  const fmt = process.env.NODE_ENV === "production" ? jsonFormat : developmentFormat;
  return createLogger({
    defaultMeta: { service: "graphql-api", ...extraMeta },
    format: fmt,
    transports: [new transports.Console()],
  });
};

const baseLogger = buildLogger({});

export function getLogger(): Logger {
  const storedLogger = loggerStorage.getStore();
  if (!storedLogger) {
    return baseLogger;
  }

  return storedLogger;
}

export default getLogger;
