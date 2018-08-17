<template>
  <div :class="['hp-checkbox-item',option.toggle?'hp-checkbox-item-active':'']">
    <span class="hp-checkbox-item-1">
      <el-checkbox :label="option.value"
                   :checked="option.checked"
                   :disabled="option.disabled">{{option.label}}</el-checkbox>
    </span>
    <span class="hp-sub-item-toggle hp-checkbox-item-2"
          @click="subItemToggle">
      <i v-if="option.hasChildren&&!option.disabled"
         class="el-icon-caret-top"
         :class="option.toggle?'is-reverse':''"></i>
    </span>
  </div>
</template>
<script>
import create from '../utils/create'
export default create({
  name: 'checkbox-item',
  props: {
    option: Object
  },
  methods: {
    subItemToggle() {
      // !this.disabled && (this.isExpand = !this.isExpand)
      // this.$emit('subItemToggle', { label: this.label, text: this.text })
      this.$emit('toggle', { label: this.label, text: this.text })
    }
  }
})
</script>
<style lang="scss">
.hp-checkbox-item {
  display: inline-block;
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  .hp-sub-item-toggle {
    display: none;
  }
  &-active,
  &:hover {
    background-color: #f2f6fc;
    .hp-sub-item-toggle {
      display: inline-block;
    }
  }
  &-1 {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    vertical-align: middle;
    .el-checkbox {
      .el-checkbox__label {
        // width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
      .el-checkbox__inner {
        vertical-align: middle;
      }
    }
  }
  &-2 {
    width: 20%;
    position: relative;
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
