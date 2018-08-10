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
    <hp-top-nav-bar :menus="menus"
                    :letter-info="letterInfo"
                    :letterTotal="999" />
    <hp-header-bar>
      <div slot="left">卓聘·顾问执行系统</div>
      <div slot="right">卓聘·顾问执行系统</div>
    </hp-header-bar>
    <!-- <hp-icon-button name="power-off"
                    tool-tip="退出"
                    effect="light" /> -->
    <hp-job-type-dialog></hp-job-type-dialog>
  </div>
</template>

<script>
import hello from "../../packages/hello";
import layout from "../../packages/layout";
import TopNavBar from "../../packages/top-nav-bar";
import HeaderBar from "../../packages/header-bar";
import IconButton from '../../packages/icon-button'
import JobTypeDialog from '../../packages/job-type-dialog'
export default {
  name: "HelloWorld",
  data() {
    return {
      menus: [
        {
          title: "首页",
          path: "todo.html"
        },
        {
          title: "统计分析",
          path: "stats.html"
        },
        {
          title: "保面试看板",
          path: "board.html"
        }
      ],
      letterInfo: {
        jobStatusCount: 25,
        newJobCount: 8,
        jobOutCount: 1
      }
    }
  },
  components: {
    [hello.name]: hello,
    [layout.name]: layout,
    [TopNavBar.name]: TopNavBar,
    [HeaderBar.name]: HeaderBar,
    [IconButton.name]: IconButton,
    [JobTypeDialog.name]: JobTypeDialog
  }
};
</script>
