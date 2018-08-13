<template>
  <div class="hp-job-type-dialog">
    <div class="hp-job-type-dialog-form">
      <label>{{label}}</label>
      <el-input @focus="dialogVisible = true"
                v-model="confirmStr"
                size="small"></el-input>
    </div>

    <el-dialog title="职位类型"
               :visible.sync="dialogVisible"
               width="650px">
      <div class="hp-dialog-container">
        <el-checkbox-group v-model="checkList"
                           :max="limit">
          <template v-for="(group,index) in groups">
            <div class="hp-item"
                 :class="{'hp-item-active':group.strKey===activeStrKey}"
                 @click="validateLimit">
              <checkbox-item :label="group.strKey"
                             :text="group.value"
                             :has-sub-item="true"
                             :caret-top="group.strKey===activeStrKey"
                             @subItemToggle="subItemToggle"></checkbox-item>
            </div>
            <template v-if="(index+1)%3===0||(index+1)===groups.length">
              <div class="hp-sub-item-group"
                   v-for="seq in 3"
                   :class="{['hp-sub-item-group-'+groups[index-seq+1].strKey]:true,'is-expand':groups[index-seq+1].strKey===activeStrKey}">
                <div class="arrow-up"
                     :style="{'left':seq==3?'7%':seq==2?'40%':'73%'}">
                  <i class="el-icon-caret-top"></i>
                </div>
                <div class="hp-item"
                     v-if="groups[index-seq+1]&&groups[index-seq+1].children"
                     v-for="child in groups[index-seq+1].children"
                     @click="validateLimit">
                  <checkbox-item :label="child.strKey"
                                 :text="child.value"
                                 :has-sub-item="false"
                                 :caret-top="false"
                                 :disabled="checkList.indexOf(groups[index-seq+1].strKey)>=0"></checkbox-item>
                </div>
              </div>
            </template>
          </template>
        </el-checkbox-group>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <div class="checked-tag">
          <el-tag v-for="tag in checkObjList"
                  :key="tag.strKey"
                  closable
                  size="small"
                  @close="handleCloseTag(tag)">
            {{tag.value}}
          </el-tag>
        </div>
        <div>
          <el-button @click="clearCheckList"
                     v-show="checkList&&checkList.length"
                     type="danger"
                     plain>清 空</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="confirmCheckListClick">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import json from '../../local/job.type.json'
import create from '../utils/create'
import CheckboxItem from '../checkbox-item'
import deepClone from '../utils/deep-clone.js'
import { returnStatement, isFile } from 'babel-types';
export default create({
  name: 'job-type-dialog',
  data() {
    return {
      dialogVisible: false,
      data: json.data,
      checkList: [],
      activeStrKey: '-1',
      groups: [],
      confirmList: []
    }
  },
  components: {
    CheckboxItem
  },
  props: {
    value: String,
    label: String,
    limit: {
      type: Number,
      default: 3
    }
  },
  computed: {
    checkObjList() {
      if (!this.checkList || !Array.isArray(this.checkList)) return []
      return this.checkList.map(key => this.findGroupInGroups(key))
    },
    confirmStr() {
      if (!this.confirmList) return ""
      return this.confirmList.map(item => item.value).join(';')
    }
  },
  methods: {
    loadData() {
      if (this.groups && this.groups.length > 0) return
      this.convertData2Groups().then(result => {
        this.groups = result
      }).then(_ => {
        if (this.value) {
          this.checkList = [...this.value.split(';')]
          console.log(this.checkList)
          this.confirmList = deepClone(this.checkObjList)
        }
      })
    },
    subItemToggle(param) {
      this.activeStrKey = param.label === this.activeStrKey ? "-1" : param.label
      /* eslint-disable no-alert, no-console */
    },
    convertData2Groups() {//异步加载数据
      return new Promise((resolve, reject) => {
        try {
          this.data.sort((x, y) => x.order - y.order)
          let groups = []
          this.data.forEach(item => {
            const subItem = this.data.filter(i => item.strKey === i.parentStrKey)//找到孩子节点
            if (subItem && subItem.length > 0) {
              const newItem = deepClone(item)
              newItem.children = [...deepClone(subItem)]
              groups.push(newItem)
            }
          })
          resolve(groups)
        } catch (e) {
          reject(e)
        }
      })
    },
    findGroupInGroups(key) {
      let isFind = false
      let result = {}
      const findGroup = function (groups, key) {
        if (groups && groups.length > 0) {
          for (const index in groups) {
            if (isFind) break
            const item = groups[index]
            if (item.children && item.children.length > 0) {
              findGroup(item.children, key)
            }
            if (item && item.strKey === key && !isFind) {
              result = item
              isFind = true
              break
            }
          }
        }
      }
      findGroup(this.groups, key)
      return result || {}
    },
    handleCloseTag(tag) {
      this.checkList.splice(this.checkList.indexOf(tag), 1)
    },
    clearCheckList() {
      this.checkList.splice(0, this.checkList.length)
    },
    confirmCheckListClick() {
      this.confirmList = deepClone(this.checkObjList)
      this.$emit('input', this.checkList.join(';'))
      this.$emit('confirmClick', this.confirmList)
      this.dialogVisible = false
    },
    validateLimit() {
      const cnt = this.checkList.length
      this.$nextTick(_ => {
        if (this.checkList.length >= this.limit && cnt === this.checkList.length) {
          this.$message({
            message: `最多只能选择${this.limit}条`,
            type: 'warning'
          });
        }
      })
    }
  },
  mounted() {
    /* eslint-disable no-alert, no-console */
    // console.log('data', json.data)
    this.loadData()
  }
})
</script>
<style lang="scss">
.hp-job-type-dialog {
  &-form {
    font-size: 14px;
    background-color: #fff;
    > label {
      width: 100px;
      display: inline-block;
      text-align: right;
      padding: 6px 5px;
    }
    > .el-input {
      width: 415px;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .hp-dialog-container {
    overflow-y: scroll;
    max-height: 500px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .hp-item {
      display: inline-block;
      padding: 5px 5px;
      margin: 2px 0;
      width: 185px;
      box-sizing: border-box;
      .hp-sub-item-toggle {
        display: none;
      }
      &:hover,
      &-active {
        background-color: #f5f6fa;
        .hp-sub-item-toggle {
          display: inline-block;
        }
      }
    }
    .hp-sub-item-group {
      background-color: #eef1f6;
      margin: 5px 0;
      display: none;
      border: 1px solid #d8dce6;
      box-sizing: border-box;
      position: relative;
      .hp-item {
        &:hover,
        &-active {
          background-color: #fff;
        }
      }
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
  .checked-tag {
    text-align: left;
    > .el-tag {
      margin: 2px 3px;
    }
  }
}
</style>
