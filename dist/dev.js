"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

// const exec = require('child_process').exec
// let dev =  (port) => {
//   console.log(port)
//   exec(`npm run dev -- --port ${port}`)
// }
// export default dev
var config = require("".concat(process.cwd(), "/webpack.config.dev.js"));

var dev = function dev(port) {
  process.env.NODE_ENV = 'development'; // 启动项目后自动打开浏览器

  new _webpackDevServer["default"]((0, _webpack["default"])(config)).listen(port, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = dev;