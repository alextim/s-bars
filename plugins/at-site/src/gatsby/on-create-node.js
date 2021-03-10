const onMdNode = require('./helpers/onMdNode2');
const onDataNode = require('./helpers/onDataNode');

const withOptions = require('./theme-options');

module.exports = async (params, pluginOptions) => {
  const { pagePathes } = withOptions(pluginOptions);
  const { node, getNode } = params;
  if (node.internal.type === 'Yaml') {
    onDataNode(params);
    return;
  }

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const type = fileNode.sourceInstanceName;
    if (pagePathes[type]) {
      onMdNode(params, type);
    }
  }
};
