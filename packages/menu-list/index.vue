<template>
  <div class="hp-menu">
    <layout :count="menus.length"
            horizontal
            class="hp-menu-container">
      <div v-for="(menu,index) in menus"
           :slot="'item-'+(index+1)"
           class="hp-menu-item">
        <a :href="menu.path"
           class="hp-menu-item-link">{{menu.title}}</a>
      </div>
    </layout>
  </div>
</template>
<script>
import create from '../utils/create'
import Layout from '../layout'
export default create({
  name: 'menu-list',
  components: {
    Layout
  },
  props: {
    menus: Array
  },
  mounted() {
    console.log('menus', this.menus)
  }
})
</script>
<style lang="scss">
.hp-menu {
  &-item {
    &-link {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #afb1bc;
      text-decoration: none;
      &:hover {
        color: #ffd329;
      }
    }
  }
}
</style>

