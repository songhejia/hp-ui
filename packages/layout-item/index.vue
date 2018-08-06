<template>
  <div class="hp-layout-item">
    <div class="hp-layout-container">
      <slot></slot>
    </div>
  </div>

</template>
<script>
import create from '../utils/create'
export default create({
  name: 'layout-item'
})
</script>
<style lang="scss">
.hp-layout {
  &-item {
    display: table-row;
    box-sizing: border-box;
  }
  &-container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  &-horizontal > &-item {
    display: table-cell;
    box-sizing: border-box;
  }
}
</style>
