/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'node-fetch';
import { getEnvironmentVariabel } from './config';
import { Request } from 'express';
import { isString } from 'lodash';

const url = `https://ndla.eu.auth0.com/oauth/token`;

const clientId = getEnvironmentVariabel(
  'NDLA_GRAPHQL_CLIENT_ID',
  'IxLzDBlvwmHBUMfLaGfJshD6Kahb362L',
);
const clientSecret = getEnvironmentVariabel(
  'NDLA_GRAPHQL_CLIENT_SECRET',
  'w9P-niyBUZK9fadBt5yNkG-7KMBULm59HB8GnJJPgwvT_gwlG98nfvdik2sVW9d_',
);

export async function getToken(request: Request): Promise<AuthToken> {
  if (process.env.NODE_ENV === 'production') {
    const authorization = request.headers.authorization;
    if (isString(authorization)) {
      return { access_token: authorization };
    }
    throw new Error('No authorization token provided');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: `${clientId}`,
      client_secret: `${clientSecret}`,
      audience: 'ndla_system',
    }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Failed to fetch token from auth0');
}
