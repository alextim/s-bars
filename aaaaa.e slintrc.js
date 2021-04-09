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
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    requireConfigFile: false,
    babelOptions: {
      // plugins: ['@babel/plugin-proposal-class-properties'],
      presets: ['babel-preset-gatsby'],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['@emotion', 'import', 'jsx-a11y', 'node', 'prettier', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    'prettier',
    'airbnb',
    'airbnb/hooks',
    // 'prettier/react',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
  ],

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
    'react/no-danger': 0,
    'react/no-array-index-key': 'warn',
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-extraneous-dependencies': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'react/button-has-type': 'warn',
  },
  globals: {
    // globalThis: false, // false means it is not writeable.
    // See https://github.com/eslint/eslint/issues/11553.
  },
};
