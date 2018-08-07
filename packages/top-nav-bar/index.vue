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
          <i class="fa fa-reorder top-nav-bar-brand-icon"></i>
          <span>卓聘</span>
        </div>
        <div slot="item-2">
          <menu-list :menus="menus"
                     dark
                     class="top-nav-bar-menu">
          </menu-list>
        </div>

        <div slot="item-3"
             class="top-nav-bar-tools">
          <el-badge ref='ref1'
                    :value="letterTotal"
                    :hidden="!letterTotal"
                    :max="99"
                    class="item badge-letter-total">
            <el-dropdown trigger="hover"
                         @command="handleCommand">
              <span class="el-dropdown-link">
                <!-- <zp-icon-button tool-tip=""
                                name="bell"
                                hover='square'
                                dark/> -->
                <icon-button class="alert-bell"
                             name="bell"
                             hover='square' />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix"
                                  command="JOB_STATUS_CHANGE">
                  已有职位动态
                  <el-badge class="mark"
                            :value="letterInfo.jobStatusCount"
                            :hidden="!letterInfo.jobStatusCount" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix"
                                  command="NEW_JOB">
                  新职位
                  <el-badge class="mark"
                            :value="letterInfo.newJobCount"
                            :hidden="!letterInfo.newJobCount" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix"
                                  command="JOB_OUT">
                  职位转出
                  <el-badge class="mark"
                            :value="letterInfo.jobOutCount"
                            :hidden="!letterInfo.jobOutCount" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-badge>
          <icon-button name="gear"
                       @click="onSetting"
                       tool-tip="设置"
                       effect="light" />
          <icon-button name="power-off"
                       @click="onLogOut"
                       tool-tip="退出"
                       effect="light" />
          <!-- <zp-icon-button v-if="user.Role2!=4"
                          @click="onSetting"
                          tool-tip="设置"
                          name="gear"
                          hover='square'
                          dark/>
          <zp-icon-button @click="onLogOut"
                          tool-tip="退出"
                          name="power-off"
                          hover='square'
                          dark/> -->
        </div>

      </layout>
    </layout-container>
  </layout>

</template>
<script>
import create from '../utils/create'
import Layout from '../layout'
import MenuList from '../menu-list'
import LayoutContainer from '../layout-container'
import IconButton from '../icon-button'
import func from './vue-temp/vue-editor-bridge';
export default create({
  name: 'top-nav-bar',
  components: {
    Layout,
    MenuList,
    LayoutContainer,
    IconButton
  },
  props: {
    menus: Array,
    letterTotal: Number,
    letterInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    handleCommand(command) {
      console.log('onDropDownCheck', command)
      this.$emit('onDropDownCheck', command)
    },
    onSetting() {
      console.log('onSetting')
      this.$emit('onSetting')
    },
    onLogOut() {
      console.log('onLogOut')
      this.$emit('onLogOut')
    }
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
      width: 330px;
    }
    > .hp-layout-item-3 {
      text-align: right;
      .badge-letter-total {
        > .el-badge__content {
          margin-top: 10px;
          padding: 0 2px;
          border: none;
          right: 20px;
        }
      }
    }
  }
  &-menu {
    font-size: 14px;
    .hp-menu-item {
      &:hover {
        background-color: #191a1f;
      }
    }
  }
  &-brand {
    &-icon {
      padding: 0 5px;
    }
  }
}
</style>

