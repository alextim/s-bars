const path = require('path');

// exports.onCreateWebpackConfig = require('./src/gatsby/on-create-webpack-config');
exports.createPages = require('./src/gatsby/create-pages');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};
