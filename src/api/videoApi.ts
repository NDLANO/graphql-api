/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GQLBrightcoveElement } from 'schema';
import sortBy from 'lodash/sortBy';
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

export async function fetchBrightcoveVideo(
  id: string,
  context: Context,
): Promise<GQLBrightcoveElement | null> {
  try {
    const brightcoveVideoUrl = `${brightcoveApiUrl}/v1/accounts/${accountId}/videos/${id}`;
    const brightcoveSourceUrl = `${brightcoveVideoUrl}/sources`;

    const [responseVideo, responseSource] = await Promise.all([
      fetchWithBrightcoveToken(brightcoveVideoUrl, context),
      fetchWithBrightcoveToken(brightcoveSourceUrl, context),
    ]);
    const brightcoveVideo: BrightcoveApiType = await resolveJson(responseVideo);
    const brightcoveSources: BrightcoveVideoSource[] = await resolveJson(
      responseSource,
    );

    const licenseInfo = Object.keys(brightcoveVideo.custom_fields)
      .filter(key => key.startsWith('licenseinfo'))
      .map(key => brightcoveVideo.custom_fields[key]);

    const source = sortBy(
      brightcoveSources.filter(source => source.width && source.height),
      source => source.height,
    )[0];
    const download = sortBy(
      brightcoveSources.filter(
        source => source.container === 'MP4' && source.src,
      ),
      source => source.size,
    );
    return {
      videoid: id,
      iframe: {
        height: source?.height ?? 480,
        width: source?.width ?? 640,
        src: source.src,
      },
      download: download[0]?.src,
      customFields: {
        licenseInfo: licenseInfo,
        license: brightcoveVideo.custom_fields.license,
        accountId: accountId,
      },
      name: brightcoveVideo.name,
    };
  } catch (e) {
    return null;
  }
}

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

export interface BrightcoveVideoSource {
  container?: string;
  size?: number;
  width?: number;
  height?: number;
  src: string;
}

export interface BrightcoveApiType {
  account_id?: string | null;
  custom_fields: Record<string, string>;
  name?: string;
}
