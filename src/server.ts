/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import compression from "compression";
import cors from "cors";
import express, { json } from "express";
import promBundle from "express-prom-bundle";
import { Server } from "http";
import { port } from "./config";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { activeRequestsMiddleware } from "./utils/activeRequestsMiddleware";
import { contextExpressMiddleware } from "./utils/context/contextMiddleware";
import { getContextOrThrow } from "./utils/context/contextStore";
import correlationIdMiddleware from "./utils/correlationIdMiddleware";
import { gracefulShutdown } from "./utils/gracefulShutdown";
import { healthRouter } from "./utils/healthRouter";
import { getLogger, logError } from "./utils/logger";
import loggerMiddleware from "./utils/loggerMiddleware";

const GRAPHQL_PORT = port;

const app = express();

let server: Server;
let apolloServer: ApolloServer<ContextWithLoaders>;

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: false,
  excludeRoutes: ["/health"],
});

app.use(metricsMiddleware);

// compress all responses
app.use(compression());
app.use(express.json({ limit: "1mb" }));

app.use(healthRouter);
app.use(activeRequestsMiddleware);

async function startApolloServer(): Promise<void> {
  apolloServer = new ApolloServer({
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
  await apolloServer.start();
  app.use(
    "/graphql-api/graphql",
    cors(),
    json(),
    correlationIdMiddleware,
    contextExpressMiddleware,
    loggerMiddleware,
    expressMiddleware(apolloServer, { context: async () => getContextOrThrow() }),
  );
  server = app.listen(GRAPHQL_PORT, () =>
    getLogger().info(`GraphQL Playground is now running on http://localhost:${GRAPHQL_PORT}/graphql-api/graphql`),
  );
}

if (process.env.NODE_ENV === "production") {
  process.on("SIGTERM", () => gracefulShutdown(server, apolloServer));
}

startApolloServer();
