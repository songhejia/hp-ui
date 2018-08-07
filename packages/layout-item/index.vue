<template>
  <div class="hp-layout-item"
       :class="'hp-layout-item-'+index">
    <slot></slot>
  </div>
</template>
<script>
import create from '../utils/create'
export default create({
  name: 'layout-item',
  props: {
    index: Number
  }
})
</script>
<style lang="scss">
.hp-layout {
  &-item {
    display: table-row;
    box-sizing: border-box;
    vertical-align: middle;
    // &-container {
    //   margin: 0 auto;
    //   width: 100%;
    //   height: 100%;
    // }
  }
  &-horizontal > &-item {
    display: table-cell;
  }
}
</style>
