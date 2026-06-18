/**
 * Copyright (c) 2026-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { trace } from "@opentelemetry/api";
import { NextFunction, Request, Response } from "express";

export const spanNamingMiddleware =
  (route: string) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const span = trace.getActiveSpan();
    if (span) {
      span.updateName(`${req.method} ${route}`);
      span.setAttribute("http.route", route);
    }
    next();
  };
