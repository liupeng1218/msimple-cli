"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _flags = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/flags"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _commander = _interopRequireDefault(require("commander"));

var _create = _interopRequireDefault(require("./create"));

var _init = _interopRequireDefault(require("./init"));

var _dev = _interopRequireDefault(require("./dev"));

var _context, _context4;

/* 处理命令行 */
var actionMap = {
  // 创建项目
  create: {
    description: '创建一个新项目',
    usages: ['mssimple-cli create ProjectName', 'ms-cli create ProjectName', 'mc create ProjectName'],
    akuas: 'c'
  },
  // 项目初始化
  init: {
    description: '项目初始化',
    usages: ['mssimple-cli init', 'ms-cli init', 'mc init'],
    akuas: 'i'
  },
  // 运行项目
  dev: {
    description: '项目本地启动',
    usages: ['mssimple-cli dev', 'ms-cli dev', 'mc dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: '3000'
    }],
    akuas: 'd'
  }
}; // 添加 create init dev 命令

(0, _forEach["default"])(_context = (0, _keys["default"])(actionMap)).call(_context, function (action) {
  // 挂载 option 参数
  if (actionMap[action].options) {
    var _context2;

    (0, _forEach["default"])(_context2 = (0, _keys["default"])(actionMap[action].options)).call(_context2, function (index) {
      var option = actionMap[action].options[index];

      _commander["default"].option((0, _flags["default"])(option), option.description, option.defaultValue);
    });
  } // 挂载 command 命令


  _commander["default"].command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(function () {
    var _context3;

    switch (action) {
      case 'create':
        _create["default"].apply(void 0, (0, _toConsumableArray2["default"])((0, _slice["default"])(_context3 = process.argv).call(_context3, 3)));

        break;

      case 'init':
        (0, _init["default"])();
        break;

      case 'dev':
        (0, _dev["default"])(_commander["default"].port);
        break;

      default:
        break;
    }
  });
}); // 项目版本

_commander["default"].version(require('../package.json').version, '-v --version').parse(process.argv); // 帮助信息


if (!(0, _slice["default"])(_context4 = process.argv).call(_context4, 2).length) {
  _commander["default"].outputHelp();
}