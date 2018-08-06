// This file is auto gererated by build/build-entry.js
import Hello from './hello';
import Layout from './layout';
import LayoutContainer from './layout-container';
import LayoutItem from './layout-item';
import MenuList from './menu-list';
import TopNavBar from './top-nav-bar';
const version = '0.1.25';
const components = [
  Hello,
  Layout,
  LayoutContainer,
  LayoutItem,
  MenuList,
  TopNavBar
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
  LayoutContainer,
  LayoutItem,
  MenuList,
  TopNavBar
};
export default {
  install,
  version
};
