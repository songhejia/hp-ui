<template>
  <div class="hp-layout"
       :class="layoutClass">
    <layout-item v-for="item in items"
                 :key="item"
                 :index="item">
      <slot :name="'item-'+item"></slot>
    </layout-item>
  </div>
</template>
<script>
import create from '../utils/create'
import LayoutItem from '../layout-item'
export default create({
  name: 'layout',
  components: {
    LayoutItem
  },
  props: {
    count: Number,
    horizontal: Boolean
  },
  computed: {
    items() {
      let items_ary = []
      for (let i = 0; i < this.count; i++)items_ary.push(i + 1)
      return items_ary
    },
    layoutClass() {
      return {
        "hp-layout-horizontal": this.horizontal
      }
    }
  }
})
</script>
<style lang="scss">
.hp-layout {
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 100%;
}
</style>

