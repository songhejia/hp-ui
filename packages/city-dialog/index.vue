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
      <div class="hp-dialog-container">
        <el-checkbox-group v-model="checkList"
                           :max="limit"
                           @change="handleChange">
          <div class="title-label">热门城市</div>
          <template v-for="(group,index) in hotCityGroups">
            <div class="hp-item"
                 @click="validateLimit"
                 :style="{'width':checkboxItemWidth}">
              <checkbox-item :label="group.strKey"
                             :text="group.value"
                             :is-expand="group.strKey===activeStrKey"
                             :has-sub-item="(!!group.children&&!!group.children.length)"
                             @subItemToggle="subItemToggle"></checkbox-item>
            </div>
            <template v-if="(index+1)%column===0||(index+1)===hotCityGroups.length">
              <div class="hp-sub-item-group"
                   v-for="seq in index%column+1"
                   :class="{'is-expand':hotCityGroups[index-seq+1].strKey===activeStrKey}">
                <div class="arrow-up"
                     :style="{'left':arrowUpLeft(seq)}">
                  <i class="el-icon-caret-top"></i>
                </div>
                <div class="hp-item"
                     v-if="hotCityGroups[index-seq+1]&&hotCityGroups[index-seq+1].children"
                     v-for="child in hotCityGroups[index-seq+1].children"
                     @click="validateLimit"
                     :style="{'width':checkboxItemWidth}">
                  <checkbox-item :label="child.strKey"
                                 :text="child.value"
                                 :has-sub-item="false"
                                 :disabled="checkList.indexOf(hotCityGroups[index-seq+1].strKey)>=0"></checkbox-item>
                </div>
              </div>
            </template>
          </template>
          <div class="title-label">省市</div>
          <template v-for="(group,index) in provinceGroups">
            <div class="hp-item"
                 @click="validateLimit"
                 :style="{'width':checkboxItemWidth}">
              <checkbox-item :label="group.strKey"
                             :text="group.value"
                             :is-expand="group.strKey===activeStrKey"
                             :has-sub-item="(!!group.children&&!!group.children.length)"
                             @subItemToggle="subItemToggle"></checkbox-item>
            </div>
            <template v-if="(index+1)%column===0||(index+1)===provinceGroups.length">
              <div class="hp-sub-item-group"
                   v-for="seq in column"
                   :class="{'is-expand':provinceGroups[index-seq+1].strKey===activeStrKey}">
                <div class="arrow-up"
                     :style="{'left':arrowUpLeft(seq)}">
                  <i class="el-icon-caret-top"></i>
                </div>
                <div class="hp-item"
                     v-if="provinceGroups[index-seq+1]&&provinceGroups[index-seq+1].children"
                     v-for="child in provinceGroups[index-seq+1].children"
                     @click="validateLimit"
                     :style="{'width':checkboxItemWidth}">
                  <checkbox-item :label="child.strKey"
                                 :text="child.value"
                                 :has-sub-item="false"
                                 :disabled="checkList.indexOf(provinceGroups[index-seq+1].strKey)>=0"></checkbox-item>
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
import hotCityJson from '../../local/hot.city.json'
import allCityJson from '../../local/all.city.json'
import create from '../utils/create'
import CheckboxItem from '../checkbox-item'
import deepClone from '../utils/deep-clone.js'
let provinceData = null;
(function () {
  hotCityJson.data.forEach(item => {
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
  allCityJson.data.forEach(item => {
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
      groups: []
    }
  },
  components: {
    CheckboxItem
  },
  props: {
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
      let hotCitys = this.hotCityData.map(item => ({ label: item.value, value: item.strKey, checked: false, toggle: false }))

      this.groups.push({
        label: '热门城市',
        option: []
      })
      this.groups.push({
        label: '省市',
        option: []
      })
      Promise.all([this.convertData2Groups(this.hotCityData), this.convertData2Groups(this.provinceData)]).then(result => {
        this.hotCityGroups = result[0]
        this.provinceGroups = result[1]
      }).then(_ => {
        if (this.value) {
          this.checkList = [...this.value]
          // console.log(this.checkList)
          this.confirmList = deepClone(this.checkObjList)
        }
      })
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
    subItemToggle(param) {
      this.activeStrKey = param.label === this.activeStrKey ? "-1" : param.label
      /* eslint-disable no-alert, no-console */
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
  .title-label {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
  }
}
</style>
