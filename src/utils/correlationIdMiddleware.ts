/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AsyncLocalStorage } from 'node:async_hooks';
import { NextFunction, Request, Response } from 'express';
import uuid from './uuid';

const asyncLocalStorage = new AsyncLocalStorage<string>();

const getAsString = (value: any): string => {
  return typeof value === 'string' ? value : '';
};

const correlationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const fromReq = getAsString(req.headers['x-correlation-id']);
  const cid = fromReq ? fromReq : uuid();

  asyncLocalStorage.run(cid, () => {
    res.locals.correlationId = cid;
    next();
  });
};

export function getCorrelationId(): string | undefined {
  return asyncLocalStorage.getStore();
}

export default correlationIdMiddleware;
