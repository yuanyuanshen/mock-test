const devServerConfig = require('./config/dev.server');
// const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: devServerConfig,
  lintOnSave: false
}
