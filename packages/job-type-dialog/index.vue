<template>
  <div class="job-type-dialog">
    <el-button type="text"
               @click="dialogVisible = true">打开嵌套表格的 Dialog</el-button>
    <el-dialog title="职位类型"
               :visible.sync="dialogVisible"
               width="650px">
      <div class="dialog-container">
        <el-checkbox-group v-model="checkedList">
          <template v-for="(group,index) in groups">
            <div class="item"
                 :class="{'item-active':group.strKey===activeStrKey}">
              <el-checkbox :label="group.strKey"
                           class="check-item">{{group.value}}</el-checkbox>
              <span class="sub-item-toggle"
                    @click="activeSubItemGroup(group.strKey)">
                <i :class="group.strKey===activeStrKey?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </span>
            </div>
            <template v-if="(index+1)%3===0||(index+1)===groups.length"
                      v-for="seq in [2,1,0]">
              <div class="sub-item-group"
                   :class="{['sub-item-group-'+groups[index-seq].strKey]:true,'is-expand':groups[index-seq].strKey===activeStrKey}">
                <div class="arrow-up"
                     :style="{'left':seq==2?'7%':seq==1?'40%':'73%'}">
                  <i class="el-icon-caret-top"></i>
                </div>
                <div class="item"
                     v-if="groups[index-seq]&&groups[index-seq].children"
                     v-for="child in groups[index-seq].children">
                  <el-checkbox :label="child.strKey"
                               class="check-item"
                               :class="{['check-item'+child.strKey]:true}"
                               :disabled="checkedList.indexOf(groups[index-seq].strKey)>=0">{{child.value}}</el-checkbox>
                </div>
              </div>
            </template>
          </template>
        </el-checkbox-group>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <div>
          <!-- <el-tag v-for="tag in checkedList"
                  :key="tag.name"
                  closable
                  :type="tag.type">
            {{tag.name}}
          </el-tag> -->

        </div>
        <div>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import json from '../../local/job.type.json'
import create from '../utils/create'
import { returnStatement } from 'babel-types';
export default create({
  name: 'job-type-dialog',
  data() {
    return {
      dialogVisible: false,
      data: json.data,
      groups: [],
      checkedList: [],
      activeStrKey: '-1'
    }
  },
  computed: {
    checkItem() {
      return this.checkedList.join(',')
    }
  },
  methods: {
    ConvertGroups() {
      this.groups && (this.groups.length = 0)
      this.data.forEach(item => {
        const subItem = this.data.filter(i => item.strKey === i.parentStrKey)//找到孩子节点
        if (subItem && subItem.length > 0) {
          item.children = []
          item.children.push(...subItem)
          this.groups.push(item)
        }
      })

      this.groups = this.groups.sort((x, y) => x.order - y.order)
      /* eslint-disable no-alert, no-console */
      // console.table(this.groups)
    },
    activeSubItemGroup(strKey) {
      this.activeStrKey = strKey === this.activeStrKey ? "-1" : strKey
      /* eslint-disable no-alert, no-console */
      // console.log(this.activeStrKey)
    }
  },
  mounted() {
    /* eslint-disable no-alert, no-console */
    // console.log('data', json.data)
    this.ConvertGroups()
  }
})
</script>
<style lang="scss">
.job-type-dialog {
  .dialog-container {
    overflow-y: scroll;
    max-height: 500px;
    border-top: 1px solid #ccc;
    .item {
      display: inline-block;
      padding: 5px 5px;
      margin: 5px 0;
      width: 185px;
      box-sizing: border-box;
      .sub-item-toggle {
        font-size: 14px;
        width: 20px;
        height: 19px;
        display: none;
        text-align: center;
        cursor: pointer;
        vertical-align: middle;
      }
      &:hover,
      &-active {
        background-color: #f5f6fa;
        .sub-item-toggle {
          display: inline-block;
        }
      }
      .check-item {
        width: 155px;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }
    .sub-item-group {
      background-color: #eef1f6;
      margin: 5px 0;
      display: none;
      border: 1px solid #d8dce6;
      box-sizing: border-box;
      position: relative;
      .arrow-up {
        position: absolute;
        top: -15px;
        font-size: 20px;
        color: #eef1f6;
        left: 7%;
      }
    }
    .is-expand {
      display: block;
    }
  }
}
</style>
