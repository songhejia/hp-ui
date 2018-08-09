<template>
  <div class="hp-header-bar">
    <layout-container>
      <layout :count="3"
              horizontal>
        <div slot="item-1"
             class="hp-header-bar-left">
          <slot name="left"></slot>
        </div>
        <div slot="item-2">

        </div>
        <div slot="item-3"
             class="hp-header-bar-right">
          <slot name="right"></slot>
        </div>
      </layout>
    </layout-container>
  </div>
</template>
<script>
import create from '../utils/create.js'
import Layout from '../layout'
import LayoutContainer from '../layout-container'
export default create({
  name: 'header-bar',
  components: {
    Layout,
    LayoutContainer
  }
})
</script>
<style lang="scss">
$height: 87px;
$content_height: 71px;
.hp-header-bar {
  background-color: #ffffff;
  height: $height;
  .hp-layout-container {
    height: $height;
  }
  .hp-layout {
    &-item-1,
    &-item-3 {
      width: 240px;
    }
  }
  &-left {
    height: $content_height;
    line-height: $content_height;
    border-right: 1px solid #cccccc;
  }
  &-right {
    text-align: right;
    border-left: 1px solid #cccccc;
    height: $content_height;
    line-height: $content_height;
  }
}
</style>
