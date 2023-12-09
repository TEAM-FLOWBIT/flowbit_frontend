const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/user-service/api/v1/member/info', {
      target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/user-service/api/v1/board', {
      target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
      changeOrigin: true,
    })
  );
};
