/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { BrightcoveApiType, BrightcoveVideoSource } from '@ndla/types-embed';
import { getEnvironmentVariabel } from '../config';
import { resolveJson } from '../utils/apiHelpers';
import { fetch } from '../utils/apiHelpers';

const b64EncodeUnicode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(Number(`0x${p1}`)),
    ),
  );

const brightcoveTokenUrl = 'https://oauth.brightcove.com/v3/access_token';
const brightcoveApiUrl = 'https://cms.api.brightcove.com';
const clientIdSecret = `${getEnvironmentVariabel(
  'BRIGHTCOVE_API_CLIENT_ID',
)}:${getEnvironmentVariabel('BRIGHTCOVE_API_CLIENT_SECRET')}`;

const accountId = getEnvironmentVariabel('BRIGHTCOVE_ACCOUNT_ID', '123456789');

export const fetchVideo = async (
  id: string,
  account: string | undefined,
  context: Context,
): Promise<BrightcoveApiType> => {
  const url = `${brightcoveApiUrl}/v1/accounts/${account ?? accountId}/videos/${
    `${id}`.split('&t=')[0]
  }`;
  return await fetchWithBrightcoveToken(url, context).then(resolveJson);
};

export const fetchVideoSources = async (
  id: string,
  account: string,
  context: Context,
): Promise<BrightcoveVideoSource[]> => {
  const url = `${brightcoveApiUrl}/v1/accounts/${account}/videos/${
    `${id}`.split('&t=')[0]
  }/sources`;
  return await fetchWithBrightcoveToken(url, context).then(resolveJson);
};

export const fetchWithBrightcoveToken = async (
  url: string,
  context: Context,
) => {
  const response = await fetchBrightcoveAccessToken(context);
  return await fetch(url, { ...context, token: response });
};

const fetchBrightcoveAccessToken = async (context: Context) =>
  await fetch(brightcoveTokenUrl, context, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: `Basic ${b64EncodeUnicode(clientIdSecret)}`,
    },
    method: 'POST',
    body: 'grant_type=client_credentials',
  }).then(token => token.json());
