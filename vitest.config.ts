/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  return {
    test: {
      include: ["src/**/__tests__/*-test.(js|ts)"],
      // environment: "jsdom",
      globals: true,
      alias: {
        // fixes Duplicate "graphql" modules cannot be used at the same time since different
        graphql: path.join(process.cwd(), "node_modules", "graphql", "index.js"),
      },

      // setupFiles: "./vitest.setup.ts",
    },
  };
});
