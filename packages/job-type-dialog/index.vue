<template>
  <div class="hp-job-type-dialog">
    <div class="hp-job-type-dialog-form">
      <label>{{label}}</label>
      <el-input @focus="dialogVisible = true"
                v-model="confirmStr"
                size="small"
                placeholder="请选择"
                :readonly="true">
        <i slot="suffix"
           class="el-icon-arrow-down el-input__icon"
           :class="dialogVisible?'is-reverse':''"
           @click="dialogVisible = true"></i>
      </el-input>
    </div>
    <el-dialog :title="label"
               :visible.sync="dialogVisible"
               width="650px">
      <div class="hp-dialog-container">
        <checkbox-item-group v-model="checkList"
                             :data="groups"></checkbox-item-group>
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
import CheckboxItemGroup from '../checkbox-item-group'
import deepClone from '../utils/deep-clone.js'
(function () {
  json.data.forEach(item => {
    delete item["aliasEnglishValue"]
    delete item["aliasPinYinValue"]
    delete item["deleted"]
    delete item["desc"]
    delete item["itemAliasValue1"]
    delete item["itemAliasValue2"]
    delete item["parentIntKey"]
    delete item["intKey"]
    delete item["id"]
  })
})()
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
    CheckboxItemGroup
  },
  props: {
    value: Array,
    label: String,
    limit: {
      type: Number,
      default: 3
    },
    column: {
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
          this.checkList = [...this.value]
          // console.log(this.checkList)
          this.confirmList = deepClone(this.checkObjList)
        }
      })
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
      this.checkList.splice(this.checkList.indexOf(tag.strKey), 1)
    },
    clearCheckList() {
      this.checkList.splice(0, this.checkList.length)
    },
    confirmCheckListClick() {
      this.confirmList = deepClone(this.checkObjList)
      this.$emit('input', this.checkList)
      this.$emit('confirmClick', this.confirmList)
      this.dialogVisible = false
    },
    handleChange() {
      //判断选中的值是否有父子关系，如果有则取消子
      // const repeatList = this.checkList.map(item => this.groups.map(group => group.children))
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
      cursor: pointer;
      .el-input__inner {
        cursor: pointer;
      }
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .hp-dialog-container {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 500px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .checked-tag {
    text-align: left;
    > .el-tag {
      margin: 2px 3px;
    }
  }
  .is-reverse {
    transform: rotate(180deg);
  }
}
</style>
