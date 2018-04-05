module.exports = {
  parser: 'typescript-eslint-parser',
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 9,
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 0,
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    eqeqeq: 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-with': 'error',
  },
};
