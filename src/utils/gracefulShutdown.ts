/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Server } from "http";
import { ApolloServer } from "@apollo/server";
import { gracePeriodSeconds } from "../config";
import { getIsShuttingDown, setIsShuttingDown } from "./healthRouter";
import getLogger from "./logger";

export async function gracefulShutdown(server: Server, apolloServer: ApolloServer<ContextWithLoaders>) {
  const logger = getLogger();
  if (getIsShuttingDown()) return;
  setIsShuttingDown();
  logger.info(
    `Recieved shutdown signal, waiting ${gracePeriodSeconds} seconds for shutdown to be detected before stopping...`,
  );
  setTimeout(async () => {
    logger.info("Shutting down gracefully...");
    if (apolloServer) await apolloServer.stop();
    if (server) server.close();
    process.exit(0);
  }, gracePeriodSeconds * 1000);
}
