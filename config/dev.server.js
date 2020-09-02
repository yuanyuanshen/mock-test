const path = require('path')

module.exports = {
  port: 8081,
  host: 'localhost',
  open: true,
  proxy: {
    'api': {
      target: 'http://easy-mock.jd.com/mock/5ddba6ead8dabc00913ae0c3/easy_cli_test',
      pathRewrite: {
        '^/api': ''
      }
    },
    '/api/id': {
      target: 'http://couponerp-gateway.jd.id',
      changeOrigin: true,
      pathRewrite: { '^/api/id': '' }
    },
    '/api/th': {
      target: 'http://couponerp-gateway.jd.co.th',
      changeOrigin: true,
      pathRewrite: { '^/api/th': '' }
    }
  },
  sockHost: 'localhost',
  disableHostCheck: true,
  progress: false,
  hot: true,
  hotOnly: true
}
