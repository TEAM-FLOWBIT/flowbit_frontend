const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware('/user-service/api/v1/member/info', {
  //     target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware('/user-service/api/v1/board', {
  //     target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware('/user-service/api/v1/mail', {
  //     target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware('/user-service/api/v1/mail/verify', {
  //     target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    createProxyMiddleware('/user-service', {
      target: 'https://apigateway.apps.sys.paas-ta-dev10.kr',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/v1/search/news.json', {
      target: 'https://openapi.naver.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/mnews/article', {
      target: 'https://n.news.naver.com',
      changeOrigin: true,
    })
  );
};
