const getRemoteIP = (req) =>
  (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;

module.exports = getRemoteIP;
