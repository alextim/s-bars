const path = require('path');

module.exports = ({ getConfig, stage, actions }) => {
  const config = getConfig();

  actions.setWebpackConfig({
    // Allow to use something like: import { X } from 'components/directory' instead of '../../components/directory'
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });

  // Disable sourcemaps
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }

  // fix https://github.com/gatsbyjs/gatsby/issues/11934
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    };
  }
};