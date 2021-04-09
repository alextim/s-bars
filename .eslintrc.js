module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'airbnb',
    'airbnb/hooks',
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
    // Allowing ++ on numbers
    'no-plusplus': 'off',
    'react/no-danger': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 'off',
  },
};
