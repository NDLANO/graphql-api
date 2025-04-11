/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import compression from "compression";
import cors from "cors";
import express, { json, Request, Response } from "express";
import promBundle from "express-prom-bundle";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { port } from "./config";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import correlationIdMiddleware from "./utils/correlationIdMiddleware";
import { logError } from "./utils/logger";
import loggerMiddleware from "./utils/loggerMiddleware";
import { contextExpressMiddleware } from "./utils/context/contextMiddleware";
import { getContextOrThrow } from "./utils/context/contextStore";

const GRAPHQL_PORT = port;

const app = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: false,
  excludeRoutes: ["/health"],
});

app.use(metricsMiddleware);

// compress all responses
app.use(compression());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: 200, text: "Health check ok" });
});

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    allowBatchedHttpRequests: true,
    includeStacktraceInErrorResponses: true,
    formatError(err) {
      logError(err);
      // Remove stack traces from client response
      const extensions = err?.extensions ? { ...err?.extensions, stacktrace: undefined } : err?.extensions;
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
        extensions,
      };
    },
  });
  await server.start();
  app.use(
    "/graphql-api/graphql",
    cors(),
    json(),
    correlationIdMiddleware,
    contextExpressMiddleware,
    loggerMiddleware,
    expressMiddleware(server, { context: async () => getContextOrThrow() }),
  );
}

startApolloServer();

app.listen(GRAPHQL_PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`GraphQL Playground is now running on http://localhost:${GRAPHQL_PORT}/graphql-api/graphql`),
);
