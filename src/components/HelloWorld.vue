<template>
  <div class="hello">
    <hp-layout :count="4"
               :horizontal="false">
      <div slot="item-1">
        <hp-hello></hp-hello>
      </div>
      <div slot="item-2">
        <hp-hello></hp-hello>
      </div>
      <div slot="item-3">
        <hp-hello></hp-hello>
      </div>
      <hp-layout slot="item-4"
                 :count="2"
                 horizontal>
        <div slot="item-1">
          <hp-hello></hp-hello>
        </div>
        <div slot="item-2">
          <hp-hello></hp-hello>
        </div>
      </hp-layout>
    </hp-layout>
    <hp-top-nav-bar :menus="menus"></hp-top-nav-bar>
  </div>
</template>

<script>
import hello from '../../packages/hello'
import layout from '../../packages/layout'
import TopNavBar from '../../packages/top-nav-bar'
export default {
  name: "HelloWorld",
  data() {
    return {
      menus: [
        {
          title: '首页',
          path: 'todo.html'
        },
        {
          title: '统计分析',
          path: 'stats.html'
        },
        {
          title: '保面试看板',
          path: 'board.html'
        }
      ]
    }
  },
  components: {
    [hello.name]: hello,
    [layout.name]: layout,
    [TopNavBar.name]: TopNavBar
  }

};
</script>