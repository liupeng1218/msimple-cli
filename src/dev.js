
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const config = require(`${process.cwd()}/webpack.config.dev.js`)

let dev = (port) => {
  process.env.NODE_ENV = 'development'
  // 启动项目后自动打开浏览器
  new WebpackDevServer(webpack(config)).listen(port, function (err, result) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = dev
