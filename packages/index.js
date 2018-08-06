// This file is auto gererated by build/build-entry.js
import Hello from './hello';
import Layout from './layout';
import LayoutItem from './layout-item';
const version = '0.1.24';
const components = [
  Hello,
  Layout,
  LayoutItem
];
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
  version,
  Hello,
  Layout,
  LayoutItem
};
export default {
  install,
  version
};
