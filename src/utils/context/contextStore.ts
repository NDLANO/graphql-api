/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AsyncLocalStorage } from "node:async_hooks";

const asyncContextStorage = new AsyncLocalStorage<ContextWithLoaders>();

export function getAsyncContextStorage() {
  return asyncContextStorage;
}

export function getContextOrThrow(): ContextWithLoaders {
  const ctx = getContext();
  if (ctx === undefined)
    throw Error("Could not get context in `getContextOrThrow`, did you remember to attach `contextExpressMiddleware`?");
  return ctx;
}

export function withCustomContext<T>(
  contextFunction: (ctx: ContextWithLoaders) => ContextWithLoaders,
  func: () => T,
): T {
  const ctx = getContextOrThrow();
  const customContext = contextFunction(ctx);
  return asyncContextStorage.run(customContext, () => {
    return func();
  });
}

export function getContext(): ContextWithLoaders | undefined {
  return asyncContextStorage.getStore();
}
