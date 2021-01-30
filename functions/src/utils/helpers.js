const getRemoteIP = (req) =>
  (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;

const sanitizeHtml = (val) => val.replace(/<(.|\n)*?>/g, '');

module.exports = { getRemoteIP, sanitizeHtml };
