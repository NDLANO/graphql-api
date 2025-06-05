/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { GraphQLFormattedError } from "graphql/error/GraphQLError";
import { createLogger, transports, format, Logger } from "winston";
import "source-map-support/register";
import { unreachable } from "./unreachable";
import { getContext } from "./context/contextStore";
import { IncomingHttpHeaders } from "node:http2";

export const loggerStorage = new AsyncLocalStorage<Logger>();

const getStackString = (stack: string | null | undefined, extensions?: { stacktrace: string[] }) => {
  if (stack) return `\n${stack}`;
  if (extensions && extensions.stacktrace) return `\n${extensions.stacktrace.join("\n")}`;
  return "";
};

const developmentErrFormat = format.printf(({ level, message, stack, requestPath, timestamp, extensions }) => {
  const stackString = getStackString(stack, extensions);
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

export type LogLevel = "error" | "warn" | "info";
const getLogLevelFromStatusCode = (statusCode: number): LogLevel => {
  if ([401, 403, 404, 410].includes(statusCode)) return "info";
  if (statusCode < 500) return "warn";
  return "error";
};

const getLoglevelFromError = (err: GraphQLFormattedError): LogLevel => {
  if (err.extensions && "status" in err.extensions && typeof err.extensions.status === "number") {
    return getLogLevelFromStatusCode(err.extensions.status);
  }
  return "error";
};

const sensorHeaders = (headers: IncomingHttpHeaders): IncomingHttpHeaders => {
  const { authorization, feideauthorization, ...rest } = headers;
  return {
    ...rest,
    authorization: authorization ? "<REDACTED>" : undefined,
    feideauthorization: feideauthorization ? "<REDACTED>" : undefined,
  };
};

const getErrorLog = (err: GraphQLFormattedError) => {
  const ctx = getContext();
  const context = ctx
    ? {
        requestPath: ctx.req.url,
        requestBody: ctx.req.body,
        requestHeaders: sensorHeaders(ctx.req.headers),
      }
    : {};

  const { message, locations, path, extensions } = err;
  const errorLog = {
    message,
    locations,
    path,
    extensions,
    ...context,
  };
  return errorLog;
};

export const logError = (err: GraphQLFormattedError) => {
  const logLevel = getLoglevelFromError(err);

  const errorLog = getErrorLog(err);

  switch (logLevel) {
    case "info":
      getLogger().info(errorLog);
      break;
    case "warn":
      getLogger().warn(errorLog);
      break;
    case "error":
      getLogger().error(errorLog);
      break;
    default:
      unreachable(logLevel);
  }
};

export default getLogger;
