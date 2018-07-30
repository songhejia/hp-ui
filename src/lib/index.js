import Hello from './Hello.vue'

const Hello = {
  install: function (Vue) {
    Vue.component('Hello', Hello)
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Hello)
}
export default Hello