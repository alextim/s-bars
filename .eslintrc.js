/*
#!/bin/sh
#
# Pre-commit hook called by "git commit" with no arguments.
# Checks staged .js(x) files for eslint errors.
# Exits with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
# Place in {projectRoot}/.git/hooks/pre-commit

git diff --diff-filter=d --cached --name-only | grep "\.js.\?$" | xargs ./node_modules/.bin/eslint
*/
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'prettier',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', '@emotion', 'react', 'react-hooks', 'import'],
  rules: {
    // 'react/react-in-jsx-scope': 'off',
    // 'react/jsx-uses-react': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-double'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'windows'],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    // Allowing ++ on numbers
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    // globalThis: false, // false means it is not writeable.
    // See https://github.com/eslint/eslint/issues/11553.
  },
};
