const onMdPageNode = require('./helpers/onMdPageNode');
const onDataNode = require('./helpers/onDataNode');

const withOptions = require('./plugin-options');

module.exports = async (params, pluginOptions) => {
  const { pageDirs } = withOptions(pluginOptions);
  const { node, getNode } = params;
  if (node.internal.type === 'Yaml') {
    onDataNode(params);
    return;
  }

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const type = fileNode.sourceInstanceName;
    if (pageDirs[type]) {
      onMdPageNode(params, type);
    }
  }
};
