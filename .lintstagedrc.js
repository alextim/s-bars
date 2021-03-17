module.exports = {
  'src/**/*.{js,jsx}': [
    'eslint --fix',
    'prettier-eslint --write',
    'git add .',
  ],
};
