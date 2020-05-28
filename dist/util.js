"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.updateJsonFile = exports.downloadTemplate = exports.prompt = exports.notExistFold = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

// 打印日志图表
// 修改输入日志颜色
// git 下载
// 检查目录是否存在
var notExistFold = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(name) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new _promise["default"](function (resolve) {
              if (_fs["default"].existsSync(name)) {
                console.log(_logSymbols["default"].error, _chalk["default"].red('项目目录已经存在，请更换名字重新创建'));
              } else {
                resolve();
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function notExistFold(_x) {
    return _ref.apply(this, arguments);
  };
}(); // 询问用户


exports.notExistFold = notExistFold;
var promptList = [{
  type: 'list',
  name: 'frame',
  message: 'please choose this project template',
  choices: ['vue', 'gulp']
}, {
  type: 'input',
  name: 'description',
  message: 'please enter this project description: '
}, {
  type: 'input',
  name: 'author',
  message: 'please enter the author name: '
}];

var prompt = function prompt() {
  return new _promise["default"](function (resolve) {
    _inquirer["default"].prompt(promptList).then(function (answer) {
      resolve(answer);
    });
  });
}; // 项目模板下载


exports.prompt = prompt;

var downloadTemplate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ProjectName, url) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new _promise["default"](function (resolve, reject) {
              (0, _downloadGitRepo["default"])(url, ProjectName, {
                clone: true
              }, function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadTemplate(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); // 更新配置文件


exports.downloadTemplate = downloadTemplate;

var updateJsonFile = function updateJsonFile(fileName, obj) {
  return new _promise["default"](function (resolve) {
    if (_fs["default"].existsSync(fileName)) {
      var _context3;

      var data = _fs["default"].readFileSync(fileName).toString();

      var json = JSON.parse(data);
      (0, _forEach["default"])(_context3 = (0, _keys["default"])(obj)).call(_context3, function (key) {
        json[key] = obj[key];
      });

      _fs["default"].writeFileSync(fileName, (0, _stringify["default"])(json, null, '\t'), 'utf-8');

      resolve();
    }
  });
};

exports.updateJsonFile = updateJsonFile;