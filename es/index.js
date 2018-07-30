// This file is auto gererated by build/build-entry.js
import Hello from './hello';
var version = '0.1.0';
var components = [Hello];
var install = function install(Vue) {
  components.forEach(function (Component) {
    Vue.use(Component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export { install, version, Hello };
export default {
  install: install,
  version: version
};