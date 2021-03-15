const onMdPostNode = require('./helpers/onMdPostNode');

const withOptions = require('./plugin-options');

module.exports = async (params, pluginOptions) => {
  const options = withOptions(pluginOptions);
  const { postsDir } = options;

  const { node, getNode } = params;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === postsDir) {
      onMdPostNode(params, options);
    }
  }
};
