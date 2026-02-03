/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ApolloServer } from "@apollo/server";
import { Server } from "http";
import { gracePeriodSeconds } from "../config";
import { getActiveRequests } from "./activeRequestsMiddleware";
import { getIsShuttingDown, setIsShuttingDown } from "./healthRouter";
import getLogger from "./logger";

async function waitForActiveRequests() {
  const timeout = 30000;
  const pollInterval = 250;
  const start = Date.now();

  const activeRequests = getActiveRequests();
  getLogger().info(`Waiting for ${activeRequests} active requests to finish...`);
  while (getActiveRequests() > 0 && Date.now() - start < timeout) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  if (getActiveRequests() > 0) {
    getLogger().warn(
      `Timeout reached while waiting for active requests to finish. Active requests: ${getActiveRequests()}`,
    );
  } else {
    getLogger().info("All active requests have finished processing.");
  }
}

export async function gracefulShutdown(server: Server, apolloServer: ApolloServer<ContextWithLoaders>) {
  const logger = getLogger();
  if (getIsShuttingDown()) return;
  setIsShuttingDown();
  logger.info(
    `Recieved shutdown signal, waiting ${gracePeriodSeconds} seconds for shutdown to be detected before stopping...`,
  );
  setTimeout(async () => {
    logger.info("Shutting down gracefully...");
    await waitForActiveRequests();
    if (server) server.close();
    if (apolloServer) await apolloServer.stop();
    process.exit(0);
  }, gracePeriodSeconds * 1000);
}
