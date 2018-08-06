<template>
  <layout :count="1"
          horizontal
          class="top-nav-bar">
    <layout-container slot="item-1">
      <layout :count="3"
              horizontal
              class="top-nav-bar-container">

        <div slot="item-1"
             class="top-nav-bar-brand">
          <!-- <zp-icon-button name="bars"
                      dark/> -->
          <span>智联</span>
        </div>
        <div slot="item-2">
          <menu-list :menus="menus"
                     dark
                     class="top-nav-bar-menu">
          </menu-list>
        </div>

        <div slot="item-3"></div>
        <!-- <div slot="item-3"
         class="top-nav-bar-tools">
      <zp-icon-button @click="onCalendarClicked"
                      tool-tip="订单日历"
                      name="calendar"
                      hover='square'
                      dark/>
      <el-badge ref='ref1'
                :value="letterTotal"
                :max="99"
                class="item">
        <el-dropdown trigger="hover"
                     @command="handleCommand">
          <span class="el-dropdown-link">
            <zp-icon-button tool-tip=""
                            name="bell"
                            hover='square'
                            dark/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix"
                              command="JOB_STATUS_CHANGE">
              已有职位动态
              <el-badge class="mark"
                        :value="letterInfo.jobStatusCount" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix"
                              command="NEW_JOB">
              新职位
              <el-badge class="mark"
                        :value="letterInfo.newJobCount" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix"
                              command="JOB_OUT">
              职位转出
              <el-badge class="mark"
                        :value="letterInfo.jobOutCount" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-badge>
      <zp-icon-button v-if="user.Role2!=4"
                      @click="onSetting"
                      tool-tip="设置"
                      name="gear"
                      hover='square'
                      dark/>
      <zp-icon-button @click="onLogOut"
                      tool-tip="退出"
                      name="power-off"
                      hover='square'
                      dark/>
    </div> -->

      </layout>
    </layout-container>
  </layout>

</template>
<script>
import create from '../utils/create'
import Layout from '../layout'
import MenuList from '../menu-list'
import LayoutContainer from '../layout-container'
export default create({
  name: 'top-nav-bar',
  components: {
    Layout,
    MenuList,
    LayoutContainer
  },
  props: {
    menus: Array
  }
})
</script>
<style lang="scss">
.top-nav-bar {
  background-color: #3d3f49;
  height: 39px;
  line-height: 39px;
  color: #fff;
  &-container {
    > .hp-layout-item-1 {
      width: 80px;
    }
    > .hp-layout-item-2 {
      width: 400px;
    }
  }
  &-menu {
    .hp-menu-item {
      &:hover {
        background-color: #191a1f;
      }
    }
  }
}
</style>

