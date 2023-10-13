/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Request } from 'express';
import isString from 'lodash/isString';

export async function getToken(
  request: Request,
): Promise<AuthToken | undefined> {
  const authorization = request.headers.authorization;

  if (isString(authorization)) {
    return { access_token: authorization.replace('Bearer ', '') };
  }

  return undefined;
}
