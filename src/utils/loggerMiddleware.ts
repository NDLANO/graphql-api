/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { NextFunction, Request, Response } from 'express';
import bunyan from 'bunyan';
import { loggerStorage } from './logger';

export function setupLogger(correlationId: string, next: NextFunction): void {
  loggerStorage.run(
    bunyan.createLogger({
      name: 'ndla-graphql-api',
      correlationId,
    }),
    next,
    'route',
  );
}

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const cid = res.locals.correlationId as string;
  setupLogger(cid, next);
};

export default loggerMiddleware;
