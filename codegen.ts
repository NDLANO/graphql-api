/**
 * Copyright (c) 2026-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { CodegenConfig } from "@graphql-codegen/cli";

const codegen: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.ts",
  generates: {
    "src/types/schema.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
        typesPrefix: "GQL",
        enumsAsTypes: true,
        scalars: {
          StringOrNull: "string | null",
        },
      },
    },
  },
};

export default codegen;
