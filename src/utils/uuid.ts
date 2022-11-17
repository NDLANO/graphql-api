/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const BaseUUID = `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`;

function uuidPart(numberString: string): string {
  const a = Number(numberString);
  return (a ^ ((Math.random() * 16) >> (a / 4))).toString(16);
}

function uuid(): string {
  return BaseUUID.replace(/[018]/g, uuidPart);
}

export default uuid;
