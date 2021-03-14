const onMdPostNode = require('./helpers/onMdPostNode');

const withOptions = require('./plugin-options');

module.exports = async (params, pluginOptions) => {
  const { postsDir } = withOptions(pluginOptions);

  const { node, getNode } = params;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === postsDir) {
      onMdPostNode(params);
    }
  }
};
