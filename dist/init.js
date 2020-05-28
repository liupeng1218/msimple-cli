"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ora = _interopRequireDefault(require("ora"));

var nodeUtil = require('util');

var exec = nodeUtil.promisify(require('child_process').exec);

var loadCmd = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cmd, text) {
    var laoding;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            laoding = (0, _ora["default"])();
            laoding.start("".concat(text, ":\u547D\u4EE4\u6267\u884C\u4E2D..."));
            _context.next = 4;
            return exec(cmd);

          case 4:
            laoding.succeed("".concat(text, ":\u547D\u4EE4\u6267\u884C\u5B8C\u6210"));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadCmd(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var init = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return loadCmd("git init", 'git初始化');

          case 3:
            _context2.next = 5;
            return loadCmd("npm install", '安装依赖');

          case 5:
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_logSymbols["default"].error, _chalk["default"].red('初始化失败'));
            console.log(_logSymbols["default"].error, _chalk["default"].red(_context2.t0));
            process.exit(1);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function init() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = init;
exports["default"] = _default;