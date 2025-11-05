/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ConfigMetaRestrictedDTO, openapi, ConfigKey } from "@ndla/types-backend/myndla-api";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

export const fetchConfig = async (configKey: string, _context: Context): Promise<ConfigMetaRestrictedDTO> => {
  return client
    .GET("/myndla-api/v1/config/{config-key}", {
      params: {
        path: {
          "config-key": configKey as ConfigKey,
        },
      },
    })
    .then(resolveJsonOATS);
};

export const fetchExamLockStatus = async (context: Context): Promise<ConfigMetaRestrictedDTO> =>
  fetchConfig("MY_NDLA_WRITE_RESTRICTED", context);
