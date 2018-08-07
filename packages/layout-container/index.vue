<template>
  <div class="hp-layout-container">
    <slot></slot>
  </div>
</template>
<script>
import create from '../utils/create'
export default create({
  name: 'hp-layout-container'
})
</script>

<style lang="scss">
.hp-layout-container {
  width: 1200px;
  margin: 0 auto;
}
</style>
