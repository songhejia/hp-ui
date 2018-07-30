'use strict';

exports.__esModule = true;
exports.Hello = exports.version = exports.install = undefined;

var _hello = require('./hello');

var _hello2 = _interopRequireDefault(_hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '0.1.8'; // This file is auto gererated by build/build-entry.js

var components = [_hello2.default];
var install = function install(Vue) {
  components.forEach(function (Component) {
    Vue.use(Component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
exports.install = install;
exports.version = version;
exports.Hello = _hello2.default;
exports.default = {
  install: install,
  version: version
};