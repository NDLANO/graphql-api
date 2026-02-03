/**
 * Copyright (c) 2024-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-check

import graphqlPlugin from "@graphql-eslint/eslint-plugin";
import config from "eslint-config-ndla";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...config,
  {
    ignores: ["**/schema.d.ts"],
  },
  {
    files: ["**/*.graphql"],
    languageOptions: {
      parser: graphqlPlugin.parser,
      parserOptions: {
        graphQLConfig: {
          schema: "./src/schema.ts",
          documents: "**/*.ts",
        },
      },
    },
    plugins: {
      "@graphql-eslint": graphqlPlugin,
    },
    rules: {
      ...graphqlPlugin.configs["flat/schema-recommended"].rules,
      "@graphql-eslint/known-type-names": "error",
      "@graphql-eslint/require-description": 0,
      "@graphql-eslint/strict-id-in-types": 0,
      "@graphql-eslint/no-typename-prefix": 0,
      "@graphql-eslint/no-unreachable-types": 0,
    },
  },
);
