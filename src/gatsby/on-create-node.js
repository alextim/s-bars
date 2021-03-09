/* eslint-disable default-case */
const onMdNode = require('../../plugins/at-site/src/gatsby/helpers/onMdNode');

module.exports = async (params) => {
  const { node, getNode } = params;
  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }
  const fileNode = getNode(node.parent);
  switch (fileNode.sourceInstanceName) {
    case 'services':
      onMdNode(params, 'service');
      break;
    case 'object-types':
      onMdNode(params, 'object-type');
      break;
  }
};
