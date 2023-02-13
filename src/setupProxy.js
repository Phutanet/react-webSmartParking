const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/smartparking',
    createProxyMiddleware({
      target: 'https://smart-park.ino.nectec.or.th:60249',
      changeOrigin: true,
    })
  );
};