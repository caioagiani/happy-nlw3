module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-undef': 0,
    'consistent-return': 0,
    'func-names': 0,
    'no-param-reassign': 0,
    'no-console': 0,
    'no-const-assign': 0,
    'no-plusplus': 0,
    'linebreak-style': 0,
    radix: 0,
    eqeqeq: 0,
    camelcase: 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
