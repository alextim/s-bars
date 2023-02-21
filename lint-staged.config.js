module.exports = {
  '*.{js,jsx}': ['eslint src/ --fix'],
  '*.{md,mdx,json,yaml}': ['prettier "**/*.{md,mdx,json,yaml}" --write'],
};
