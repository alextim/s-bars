const onMdNode = require('../../../at-site/src/gatsby/helpers/onMdNode');

const fields = {
  year: (frontmatter) => {
    const { datePublished } = frontmatter;
    const year = datePublished ? new Date(datePublished).getFullYear() : null;
    return year;
  },
};

module.exports = async (params) => {
  const { node, getNode } = params;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.sourceInstanceName === 'posts') {
      onMdNode(params, 'post', fields);
    }
  }
};
