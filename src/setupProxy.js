const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/bitcoin-service', {
      target: 'https://api.flowbit.co.kr',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/user-service', {
      target: 'https://api.flowbit.co.kr',
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
