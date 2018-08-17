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
                <template v-if="option.hasChildren"
                          v-for="(children,childrenIndex) in option.option">
                  <div :class="['hp-item','hp-item-'+children.index]"
                       :style="{'width':checkboxItemWidth}">
                    <checkbox-item :option="children"
                                   @toggle="childrenToggle(children,option)"></checkbox-item>
                  </div>
                  <div :class="['hp-item-list','hp-item-list-children','hp-item-list-'+children.index+'-'+children.value,children.toggle?'is-expand':'']">
                    <template v-if="children.hasChildren"
                              v-for="(grandson,grandsonIndex) in children.option">
                      <div :class="['hp-item','hp-item-'+grandson.index]"
                           :style="{'width':checkboxItemWidth}">
                        <checkbox-item :option="grandson"
                                       @toggle="grandsonToggle(grandson,children)"></checkbox-item>
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
let provinceData = null;
(function () {
  provinceData = deepClone(allCityJson.data.filter(item => item.parentStrKey === "489" && !hotCityJson.data.find(i => i.strKey === item.strKey)))
})()
export default create({
  name: 'city-dialog',
  data() {
    return {
      dialogVisible: false,
      hotCityData: hotCityJson.data,
      provinceData: provinceData,
      allCityData: allCityJson.data,
      checkList: [],
      activeStrKey: '-1',
      hotCityGroups: [],
      allCityGroups: [],
      provinceGroups: [],
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
      // if (this.hotCityGroups && this.hotCityGroups.length > 0) return
      // let hotCitys = this.hotCityData.map(item => ({ label: item.value, value: item.strKey, checked: false, toggle: false }))
      const allCitys = _.map(this.allCityData, item => ({ id: item.id, label: item.value, value: item.strKey, parent: item.parentStrKey, checked: false, toggle: false, option: [], hasChildren: false }))
      const hotCitys = _.map(this.hotCityData, item => ({ id: item.id, label: item.value, value: item.strKey, parent: item.parentStrKey, checked: false, toggle: false, option: [], hasChildren: false }))

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
          _.each(group.option, (option, optionIndex) => {
            option.hasChildren = !!option.option.length
            option.index = `${groupIndex}-${optionIndex}`
            if (option.hasChildren) {
              _.each(option.option, (children, childrenIndex) => {
                children.hasChildren = !!children.option.length
                children.index = `${groupIndex}-${optionIndex}-${childrenIndex}`
                if (children.hasChildren) {
                  _.each(children.option, (grandson, grandsonIndex) => {
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
      // Promise.all([this.convertData2Groups(this.hotCityData), this.convertData2Groups(this.provinceData)]).then(result => {
      //   this.hotCityGroups = result[0]
      //   this.provinceGroups = result[1]
      // }).then(_ => {
      //   if (this.value) {
      //     this.checkList = [...this.value]
      //     // console.log(this.checkList)
      //     this.confirmList = deepClone(this.checkObjList)
      //   }
      // })
    },
    convertData2Groups(data) {//异步加载数据
      return new Promise((resolve, reject) => {
        try {
          data.sort((x, y) => x.order - y.order)
          let groups = []
          data.forEach(item => {
            const subItem = this.allCityData.filter(i => item.strKey === i.parentStrKey)//找到孩子节点
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
      console.log(Math.floor(lastIndex / this.column) * this.column + this.column - 1)
      const afterDomIndex = Math.min(Math.floor(lastIndex / this.column) * this.column + this.column - 1, _.size(parent.option) - 1)
      console.log(`.hp-${this.dialogId} .hp-item-${parent.index}-${afterDomIndex}`)
      this.$nextTick(_ => {
        const optionDom = $d.getEle(`.hp-${this.dialogId} .hp-item-${parent.index}-${afterDomIndex}`)[0]
        const subGroupDom = $d.getEle(`.hp-${this.dialogId} .hp-item-list-${option.index}-${option.value}`)[0]
        console.log(subGroupDom, optionDom)
        $d.insertAfter(subGroupDom, optionDom)
      })
    },
    optionToggle(option, parent) {
      if (this.lastExpandOption === option) {
        option.toggle = false
        this.lastExpandOption = null
      } else {
        option.toggle = true
        if (this.lastExpandOption) {
          this.lastExpandOption.toggle = false
        }
        this.lastExpandOption = option
      }
      option.toggle && this.expand(option, parent)
      /* eslint-disable no-alert, no-console */
    },
    childrenToggle(option, parent) {
      if (this.lastExpandChildern === option) {
        option.toggle = false
        this.lastExpandChildern = null
      } else {
        option.toggle = true
        if (this.lastExpandChildern) {
          this.lastExpandChildern.toggle = false
        }
        this.lastExpandChildern = option
      }
      option.toggle && this.expand(option, parent)
    },
    grandsonToggle(option, parent) {
      if (this.lastExpandGrandson === option) {
        option.toggle = false
        this.lastExpandGrandson = null
      } else {
        option.toggle = true
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
        background-color: #dcdfe6;
        border: 1px solid #d8dce6;
      }
      &-children {
        background-color: #ffffff;
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
