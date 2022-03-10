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
): Promise<IImageMetaInformationV2 | null> {
  const response = await fetch(`/image-api/v2/images/${imageId}`, context);
  try {
    return await resolveJson(response);
  } catch (e) {
    return null;
  }
}

export function convertToSimpleImage(image: IImageMetaInformationV2) {
  return {
    title: image.title.title,
    src: image.imageUrl,
    altText: image.alttext.alttext,
    contentType: image.contentType,
    copyright: image.copyright,
  };
}
