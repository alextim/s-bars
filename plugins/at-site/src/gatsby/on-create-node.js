const onMdNode = require('./helpers/onMdNode');
const onDataNode = require('./helpers/onDataNode');

module.exports = async (params) => {
  const { node, getNode } = params;
  if (node.internal.type === 'Yaml') {
    onDataNode(params);
    return;
  }

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === 'pages') {
      onMdNode(params, 'page');
    }
  }
};
