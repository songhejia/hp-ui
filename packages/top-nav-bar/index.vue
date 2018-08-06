<template>
  <zp-layout :count="3"
             name="top-nav-bar"
             horizontal>

    <div slot="item-1"
         class="top-nav-bar-brand">
      <zp-icon-button name="bars"
                      dark/>
      <span>智联</span>
    </div>

    <zp-menu slot="item-2"
             :items="menus"
             dark
             class="top-nav-bar-menu" />

    <div slot="item-3"
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
    </div>

  </zp-layout>
</template>
<script>
export default {
  name: 'top-nav-bar',
  props: {
    menus: Array
  }
}
</script>
