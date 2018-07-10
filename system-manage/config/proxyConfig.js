/**
 * 微服务代理url
 * @author   lvzhiyuan
 * @date     2018/7/5
 */

module.exports = {
  proxyList: {
    '/base': {
      target: 'http://192.1.40.111:8054/base',
      changeOrigin:true,
      pathRewrite:{
        '^/base': '' // http://localhost:8083/api
      }
    },
    '/upload': {
      target: 'http://192.1.40.111:8054/upload',
      changeOrigin: true,
      pathRewrite: {
        '^/upload': '' // http://localhost:8083/upload
      }
    },
    '/authority': {
      target: 'http://192.1.40.111:8055/authority',
      changeOrigin:true,
      pathRewrite:{
        '^/authority': '' // http://localhost:8083/api
      }
    }
  }
};
