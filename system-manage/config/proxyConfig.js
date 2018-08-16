/**
 * 微服务代理url
 * @author   lvzhiyuan
 * @date     2018/7/5
 */

module.exports = {
  proxyList: {
    '/base': {
      target: 'http://127.0.0.1:8054/base',
      changeOrigin:true,
      pathRewrite:{
        '^/base': '' // http://localhost:8083/base
      }
    },
    '/upload': {
      target: 'http://127.0.0.1:8054/upload',
      changeOrigin: true,
      pathRewrite: {
        '^/upload': '' // http://localhost:8083/upload
      }
    },
    '/authority': {
      target: 'http://127.0.0.1:8055/authority',
      changeOrigin:true,
      pathRewrite:{
        '^/authority': '' // http://localhost:8083/authority
      }
    },
    '/shortcut': {
      target: 'http://127.0.0.1:9095/shortcut',
      changeOrigin: true,
      pathRewrite: {
        '^/shortcut': ''
      }
    }
  }
};
