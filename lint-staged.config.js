module.exports = {
  '*.{js,ts,tsx}': ['eslint --fix'],
  '*.{md,mdx,json,yaml}': ['prettier "**/*.{md,mdx,json,yaml}" --write'],
};
