<template>
  <div class="hp-checkbox-item">
    <el-checkbox :label="label"
                 :disabled="disabled"
                 class="hp-checkbox-item-1">{{text}}</el-checkbox>
    <span class="hp-sub-item-toggle"
          @click="subItemToggle">
      <i v-if="hasSubItem&&!disabled"
         :class="caretTop?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
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
    caretTop: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    subItemToggle() {
      this.$emit('subItemToggle', { label: this.label, text: this.text })
    }
  }
})
</script>
<style lang="scss">
.hp-checkbox-item {
  &-1 {
    width: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .hp-sub-item-toggle {
    font-size: 14px;
    width: 20px;
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
}
</style>
