// This file is auto gererated by build/build-entry.js
import Ahello from './ahello';
import Hello from './hello';
const version = '0.1.22';
const components = [
  Ahello,
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
  Ahello,
  Hello
};
export default {
  install,
  version
};
