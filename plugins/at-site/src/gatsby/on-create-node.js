const onMdNode = require('./helpers/onMdNode');
const onDataNode = require('./helpers/onDataNode');

const withOptions = require('./theme-options');

module.exports = async (params, pluginOptions) => {
  const { pagesPath } = withOptions(pluginOptions);
  const { node, getNode } = params;
  if (node.internal.type === 'Yaml') {
    onDataNode(params);
    return;
  }

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === pagesPath) {
      onMdNode(params, 'page');
    }
  }
};
