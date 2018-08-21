<template>
  <div class="hp-checkbox-dialog">
    <div class="hp-checkbox-dialog-form">
      <label v-if="!!label">{{label}}</label>
      <el-input @focus="dialogVisible = true"
                v-model="confirmText"
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
                           :max="limit">
          <template v-for="(group,groupIndex) in groups">
            <div class="title-label"
                 v-if="group.label">
              <label v-text="group.label"></label>
            </div>
            <template v-if="group.hasChildren"
                      v-for="(option,optionIndex) in group.option">
              <div :class="['hp-item','hp-item-'+option.index]"
                   :style="{'width':checkboxItemWidth}">
                <checkbox-item :option="option"
                               @toggle="optionToggle(option,group)"></checkbox-item>
              </div>
              <div v-if="option.hasChildren&&option.toggle"
                   :class="['hp-item-list','hp-item-list-option','hp-item-list-'+option.index+'-'+option.value]">
                <template v-for="(children,childrenIndex) in option.option">
                  <div :class="['hp-item','hp-item-'+children.index]"
                       :style="{'width':checkboxItemWidth}">
                    <checkbox-item :option="children"
                                   @toggle="childrenToggle(children,option)"></checkbox-item>
                  </div>
                  <div v-if="children.hasChildren&&children.toggle"
                       :class="['hp-item-list','hp-item-list-children','hp-item-list-'+children.index+'-'+children.value]">
                    <template v-for="(grandson,grandsonIndex) in children.option">
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
                  :key="tag.value"
                  closable
                  size="small"
                  @close="handleCloseTag(tag)">
            {{tag.label}}
          </el-tag>
        </div>
        <div v-show="limit===this.checkList.length"
             class="hp-max-limit">
          <span>
            <i class="el-icon-warning"></i>
            <label>最多只能选择{{limit}}个</label>
          </span>
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
import create from '../utils/create'
import CheckboxItem from '../checkbox-item'
import _ from 'lodash'
import $d from '../utils/$d.js'
export default create({
  name: 'checkbox-dialog',
  data() {
    return {
      dialogVisible: false,
      checkList: _.clone(this.value) || [],
      lastExpandOption: null,
      lastExpandChildern: null,
      lastExpandGrandson: null,
      selfModel: ''
    }
  },
  components: {
    CheckboxItem
  },
  props: {
    dialogId: {
      type: String,
      required: true
    },
    label: String,
    title: String,
    limit: {
      type: Number,
      default: 3
    },
    column: {
      type: Number,
      default: 6
    },
    data: {
      type: Array,
      required: true,
      validator: function (value) {
        return true
      }
    },
    value: Array
  },
  watch: {
    checkList: function (val, oldVal) {
      const value = _.first(_.difference(val, oldVal) || _.difference(oldVal, val))
      const option = this.findGroupInGroups(value)
      const checked = _.indexOf(this.checkList, option.value) >= 0
      const handleOption = o => {
        if (o.hasChildren) {
          _.each(o.option, obj => {
            obj.disabled = checked
            obj.disabled && _.pull(this.checkList, obj.value)
            if (obj.hasChildren) handleOption(obj)
          })
        }
      }
      handleOption(option)
    }
  },
  computed: {
    checkObjList() {
      if (!this.checkList || !Array.isArray(this.checkList)) return []
      return this.checkList.map(key => this.findGroupInGroups(key))
    },
    confirmObjList() {
      if (!this.value || !Array.isArray(this.value)) return []
      return this.value.map(key => this.findGroupInGroups(key))
    },
    checkboxItemWidth() {
      return `${100 / this.column}%`
    },
    confirmText: {
      get() {
        return _.map(this.confirmObjList, 'label').join(';')
      },
      set() { }
    },
    groups: {
      get() {
        /*处理数据*/
        const groups = this.data
        _.each(groups, (group, groupIndex) => {
          this.$set(group, 'hasChildren', !!group.option.length)
          this.$set(group, 'index', groupIndex)
          if (group.hasChildren) {
            group.option = _.sortBy(group.option, ['order'])
            _.each(group.option, (option, optionIndex) => {
              this.$set(option, 'disabled', false)
              this.$set(option, 'toggle', false)
              this.$set(option, 'hasChildren', !!option.option.length)
              this.$set(option, 'index', `${groupIndex}-${optionIndex}`)
              if (option.hasChildren) {
                option.option = _.sortBy(option.option, ['order'])
                _.each(option.option, (children, childrenIndex) => {
                  this.$set(children, 'disabled', false)
                  this.$set(children, 'toggle', false)
                  this.$set(children, 'hasChildren', !!children.option.length)
                  this.$set(children, 'index', `${groupIndex}-${optionIndex}-${childrenIndex}`)
                  if (children.hasChildren) {
                    children.option = _.sortBy(children.option, ['order'])
                    _.each(children.option, (grandson, grandsonIndex) => {
                      this.$set(grandson, 'disabled', false)
                      this.$set(grandson, 'toggle', false)
                      this.$set(grandson, 'hasChildren', !!grandson.option.length)
                      this.$set(grandson, 'index', `${groupIndex}-${optionIndex}-${childrenIndex}-${grandsonIndex}`)
                    })
                  }
                })
              }
            })
          }
        })
        return groups
      }
    }
  },
  methods: {
    findGroupInGroups(key) {
      let result = null
      const findGroup = function (array, value) {
        _.each(array, item => {
          if (item.value === value) {
            result = item
          }
          if (!result && item.hasChildren) {
            return findGroup(item.option, value)
          }
        })
        if (result) return result
      }
      return findGroup(this.groups, key) || {}
    },
    handleCloseTag(tag) {
      this.checkList.splice(this.checkList.indexOf(tag.value), 1)
    },
    clearCheckList() {
      this.checkList.splice(0, this.checkList.length)
    },
    confirmCheckListClick() {
      this.$emit('input', this.checkList)
      this.$emit('confirmClick', this.checkObjList)
      this.dialogVisible = false
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
    }
  }
})
</script>
<style lang="scss">
.hp-checkbox-dialog {
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
      // display: none;
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
  .is-expand {
    display: block;
  }
  .title-label {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
  }
  .el-checkbox-group {
    font-size: 14px;
  }
  .hp-max-limit {
    text-align: left;
    > span {
      font-size: 12px;
      color: #f56c6c;
    }
  }
}
</style>
