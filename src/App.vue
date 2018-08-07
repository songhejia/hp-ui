<template>
  <div id="app">
    <layout :count="2"
            :horizontal="false">
      <h1 slot="item-1">测试组件</h1>
      <HelloWorld slot="item-2"
                  msg="Welcome to Your Vue.js App" />
    </layout>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import layout from "../packages/layout";
export default {
  name: "app",
  components: {
    HelloWorld,
    layout
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  padding: 0;
  margin: 0;
}
</style>
