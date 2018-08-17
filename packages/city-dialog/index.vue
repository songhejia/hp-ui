<template>
  <div class="hp-city-dialog">
    <div class="hp-city-dialog-form">
      <label v-if="!!label">{{label}}</label>
      <el-input @focus="dialogVisible = true"
                v-model="confirmStr"
                size="mini"
                placeholder="请选择"
                :readonly="true">
        <i slot="suffix"
           class="el-icon-arrow-down el-input__icon"
           :class="dialogVisible?'is-reverse':''"
           @click="dialogVisible = true"></i>
      </el-input>
    </div>
    <el-dialog :title="title||label"
               :visible.sync="dialogVisible"
               width="650px">
      <div class="hp-dialog-container"
           :class="'hp-'+dialogId">
        <el-checkbox-group v-model="checkList"
                           :max="limit"
                           @change="handleChange">
          <template v-for="(group,groupIndex) in groups">
            <div class="title-label"
                 v-if="group.label">
              <label v-text="group.label"></label>
            </div>
            <template v-if="group.hasChildren"
                      v-for="(option,optionIndex) in group.option">
              <div :class="['hp-item','hp-item-'+option.index,option.toggle?'is-active':'']"
                   :style="{'width':checkboxItemWidth}">
                <checkbox-item :option="option"
                               @toggle="optionToggle(option,group)"></checkbox-item>
              </div>
              <div :class="['hp-item-list','hp-item-list-option','hp-item-list-'+option.index+'-'+option.value,option.toggle?'is-expand':'']">
                <template v-if="option.hasChildren&&option.toggle"
                          v-for="(children,childrenIndex) in option.option">
                  <div :class="['hp-item','hp-item-'+children.index]"
                       :style="{'width':checkboxItemWidth}">
                    <checkbox-item :option="children"
                                   @toggle="childrenToggle(children,option)"></checkbox-item>
                  </div>
                  <div :class="['hp-item-list','hp-item-list-children','hp-item-list-'+children.index+'-'+children.value,children.toggle?'is-expand':'']">
                    <template v-if="children.hasChildren&&children.toggle"
                              v-for="(grandson,grandsonIndex) in children.option">
                      <div :class="['hp-item','hp-item-'+grandson.index]"
                           :style="{'width':checkboxItemWidth}">
                        <checkbox-item :option="grandson"></checkbox-item>
                      </div>
                    </template>
                  </div>
                </template>
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
import hotCityJson from '../../local/hot.city.json'
import allCityJson from '../../local/all.city.json'
import create from '../utils/create'
import CheckboxItem from '../checkbox-item'
import deepClone from '../utils/deep-clone.js'
import _ from 'lodash'
import $d from '../utils/$d.js'
export default create({
  name: 'city-dialog',
  data() {
    return {
      dialogVisible: false,
      hotCityData: hotCityJson.data,
      allCityData: allCityJson.data,
      checkList: [],
      confirmList: [],
      groups: [],
      lastExpandOption: null,
      lastExpandChildern: null,
      lastExpandGrandson: null
    }
  },
  components: {
    CheckboxItem
  },
  props: {
    dialogId: {
      type: String,
      default: Math.round(Math.random() * 1000000) + ''
    },
    value: Array,
    label: String,
    title: String,
    limit: {
      type: Number,
      default: 3
    },
    column: {
      type: Number,
      default: 6
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
    },
    checkboxItemWidth() {
      return `${100 / this.column}%`
    }
  },
  methods: {
    loadData() {
      const allCitys = _.map(this.allCityData, item => ({ order: item.order, label: item.value, value: item.strKey, parent: item.parentStrKey, option: [] }))
      const hotCitys = _.map(this.hotCityData, item => ({ order: item.order, label: item.value, value: item.strKey, parent: item.parentStrKey, option: [] }))

      _.each(hotCitys, item => {
        let subItem = _.filter(allCitys, { 'parent': item.value })
        item.option = subItem
        item.hasChildren = !!subItem.length
      })

      const provinces = _.reject(_.filter(allCitys, { 'parent': '489' }), item => _.find(hotCitys, { 'value': item.value }))
      _.each(provinces, item => {
        let subItem = _.filter(allCitys, { 'parent': item.value })
        item.option = subItem
        item.hasChildren = !!subItem.length
        if (item.hasChildren) {
          _.each(item.option, o => {
            let sub = _.filter(allCitys, { 'parent': o.value })
            o.option = sub
            o.hasChildren = !!sub.length
          })
        }
      })
      // console.log('provinces', provinces)
      const groups = []
      groups.push({
        label: '热门城市',
        option: hotCitys,
        hasChildren: true
      })
      groups.push({
        label: '省市',
        option: provinces,
        hasChildren: true
      })

      _.each(groups, (group, groupIndex) => {
        group.hasChildren = !!group.option.length
        group.index = groupIndex
        if (group.hasChildren) {
          group.option = _.sortBy(group.option, ['order'])
          _.each(group.option, (option, optionIndex) => {
            option.checked = false
            option.toggle = false
            option.hasChildren = !!option.option.length
            option.index = `${groupIndex}-${optionIndex}`
            if (option.hasChildren) {
              option.option = _.sortBy(option.option, ['order'])
              _.each(option.option, (children, childrenIndex) => {
                children.checked = false
                children.toggle = false
                children.hasChildren = !!children.option.length
                children.index = `${groupIndex}-${optionIndex}-${childrenIndex}`
                if (children.hasChildren) {
                  children.option = _.sortBy(children.option, ['order'])
                  _.each(children.option, (grandson, grandsonIndex) => {
                    grandson.checked = false
                    grandson.toggle = false
                    grandson.hasChildren = !!grandson.option.length
                    grandson.index = `${groupIndex}-${optionIndex}-${childrenIndex}-${grandsonIndex}`
                  })
                }
              })
            }
          })
        }
      })
      this.groups = groups
      console.log('this.groups', this.groups)
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
      findGroup(this.allCityData, key)
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
    },
    expand(option, parent) {
      const lastIndex = +_.last(_.split(option.index, '-'))
      const afterDomIndex = Math.min(Math.floor(lastIndex / this.column) * this.column + this.column - 1, _.size(parent.option) - 1)
      this.$nextTick(_ => {
        const optionDom = $d.getEle(`.hp-${this.dialogId} .hp-item-${parent.index}-${afterDomIndex}`)[0]
        const subGroupDom = $d.getEle(`.hp-${this.dialogId} .hp-item-list-${option.index}-${option.value}`)[0]
        $d.insertAfter(subGroupDom, optionDom)
      })
    },
    optionToggle(option, parent) {
      option.toggle = !option.toggle
      if (this.lastExpandOption === option) {
        this.lastExpandOption = null
      } else {
        if (this.lastExpandOption) {
          this.lastExpandOption.toggle = false
        }
        this.lastExpandOption = option
      }
      option.toggle && this.expand(option, parent)
      /*收起上次打开的孩子节点*/
      this.lastExpandChildren && this.childrenToggle(this.lastExpandChildren, this.lastExpandOption)
    },
    childrenToggle(option, parent) {
      option.toggle = !option.toggle
      if (this.lastExpandChildren === option) {
        this.lastExpandChildren = null
      } else {
        if (this.lastExpandChildren) {
          this.lastExpandChildren.toggle = false
        }
        this.lastExpandChildren = option
      }
      option.toggle && this.expand(option, parent)
    },
    grandsonToggle(option, parent) {
      option.toggle = true
      if (this.lastExpandGrandson === option) {
        this.lastExpandGrandson = null
      } else {
        if (this.lastExpandGrandson) {
          this.lastExpandGrandson.toggle = false
        }
        this.lastExpandGrandson = option
      }
      option.toggle && this.expand(option, parent)
    },
    removeOptionCheck() {

    },
    getParents(option) {
      const parents = option.parent
    },
    arrowUpLeft(seq) {
      return `${100 / 2 / this.column * (seq * 2 - 1)}%`
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
.hp-city-dialog {
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
  .hp-item {
    display: inline-block;
    &-list {
      display: none;
      .el-checkbox__label {
        font-size: 12px;
      }
      &-option {
        background-color: #e4e7ed;
        border: 1px solid #d8dce6;
      }
      &-children {
        background-color: #ebeef5;
        border: none;
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
  .is-active {
  }
  .title-label {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
  }
  .el-checkbox-group {
    font-size: 14px;
  }
}
</style>
