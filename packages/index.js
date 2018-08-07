// This file is auto gererated by build/build-entry.js
import BaseScss from './base.scss';
import Hello from './hello';
import IconButton from './icon-button';
import Layout from './layout';
import LayoutContainer from './layout-container';
import LayoutItem from './layout-item';
import MenuList from './menu-list';
import TopNavBar from './top-nav-bar';
const version = '0.1.37';
import 'font-awesome/css/font-awesome.min.css'
import './base.scss'
const components = [
  BaseScss,
  Hello,
  IconButton,
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
  BaseScss,
  Hello,
  IconButton,
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
