/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IImageMetaInformationV2 } from '@ndla/types-image-api';
import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchImage(
  imageId: string,
  context: Context,
): Promise<IImageMetaInformationV2> {
  const response = await fetch(`/image-api/v2/images/${imageId}`, context);
  try {
    const image = await resolveJson(response);
    if (!image.id) {
      return null;
    }
  } catch (e) {
    return null;
  }
}
