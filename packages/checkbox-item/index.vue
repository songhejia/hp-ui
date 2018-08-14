<template>
  <div class="hp-checkbox-item"
       :class="isExpand?'hp-checkbox-item-active':''"
       :style="{'width':checkboxItemWidth}">
    <span class="hp-checkbox-item-1">
      <el-checkbox :label="label"
                   :disabled="disabled">{{text}}</el-checkbox>
    </span>
    <span class="hp-sub-item-toggle hp-checkbox-item-2"
          @click="subItemToggle">
      <i v-if="hasSubItem&&!disabled"
         class="el-icon-caret-top"
         :class="isExpand?'is-reverse':''"></i>
    </span>
  </div>
</template>
<script>
import create from '../utils/create'
export default create({
  name: 'checkbox-item',
  props: {
    label: String,
    text: String,
    hasSubItem: {
      type: Boolean,
      default: false
    },
    isExpand: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checkboxItemWidth: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    subItemToggle() {
      // !this.disabled && (this.isExpand = !this.isExpand)
      this.$emit('subItemToggle', { label: this.label, text: this.text })
    }
  }
})
</script>
<style lang="scss">
.hp-checkbox-item {
  display: inline-block;
  padding: 5px;
  margin: 2px;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  .hp-sub-item-toggle {
    display: none;
  }
  &-active,
  &:hover {
    background-color: #f5f6fa;
    .hp-sub-item-toggle {
      display: inline-block;
    }
  }
  &-1 {
    display: inline-block;
    width: 80%;
    .el-checkbox {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  }
  &-2 {
    width: 20%;
    font-size: 14px;
    height: 19px;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }
  &:hover {
    .el-checkbox__inner {
      border: 1px solid #429eff;
    }
  }
  .is-reverse {
    transform: rotate(180deg);
  }
}
</style>
