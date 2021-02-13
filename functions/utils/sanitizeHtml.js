const sanitizeHtml = (val) => val.replace(/<(.|\n)*?>/g, '');

module.exports = sanitizeHtml;
