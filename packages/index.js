// This file is auto gererated by build/build-entry.js
import Hello from './hello';
const version = '0.1.10';
const components = [
  Hello
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
  Hello
};
export default {
  install,
  version
};
