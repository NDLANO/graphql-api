module.exports = {
  extends: 'eslint-config-ndla',
  overrides: [
    {
      files: ['*.{js,jsx,ts,tsx}'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      extends: ['plugin:@graphql-eslint/schema-recommended'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/require-description': 0,
        '@graphql-eslint/strict-id-in-types': 0,
        '@graphql-eslint/no-typename-prefix': 0,
        '@graphql-eslint/no-unreachable-types': 0,
      },
      parserOptions: {
        schema: './src/schema.ts',
      },
    },
  ],
  plugins: ['@graphql-eslint'],
};
