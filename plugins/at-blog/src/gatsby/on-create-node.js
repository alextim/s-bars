const onMdNode = require('./helpers/onMdNode2');

const withOptions = require('./theme-options');

module.exports = async (params, pluginOptions) => {
  const { postsPath } = withOptions(pluginOptions);

  const { node, getNode } = params;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === postsPath) {
      onMdNode(params);
    }
  }
};
