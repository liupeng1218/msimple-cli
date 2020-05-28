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

var _util = require("./util");

// 打印日志图表
// 修改输入日志颜色
// 显示下载进度
var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ProjectName) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (ProjectName === undefined) {
              console.log(_logSymbols["default"].error, _chalk["default"].red('请输入项目名称！'));
            } else {
              // 当前目录不存在同名项目继续创建
              (0, _util.notExistFold)(ProjectName).then(function () {
                // 交互询问
                (0, _util.prompt)().then(function (answer) {
                  console.log(answer); // 根据用户配置信息下载模板&更新模板

                  var loading = (0, _ora["default"])('模板下载中...');
                  loading.start('模板下载中...');
                  var URL = '';

                  switch (answer.frame) {
                    case 'vue':
                      URL = 'direct:https://github.com/liupeng1218/vue-template.git';
                      break;

                    default:
                      break;
                  }

                  (0, _util.downloadTemplate)(ProjectName, URL).then(function () {
                    loading.succeed('模板下载完成...'); // 根据用户输入更新配置文件

                    var fileName = "".concat(ProjectName, "/package.json");
                    answer.name = ProjectName;
                    (0, _util.updateJsonFile)(fileName, answer).then(function () {
                      console.log(_logSymbols["default"].success, _chalk["default"].green('配置文件更新完成。'));
                    });
                  })["catch"](function (err) {
                    loading.fail('模板下载失败：' + err);
                  });
                });
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = create;
exports["default"] = _default;