<template>
  <div class="hp-icon-button"
       @click="handleClick">
    <i class="fa"
       :class="iconClass"></i>
  </div>
</template>
<script>
import create from '../utils/create'
export default create({
  name: 'hp-icon-button',
  props: {
    name: String
  },
  computed: {
    iconClass() {
      return `fa-${this.name}`
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
})
</script>
<style lang="scss">
.hp-icon-button {
  display: inline-block;
  width: 39px;
  text-align: center;
  margin: 0 5px;
  cursor: pointer;
  > i {
    color: #adb2bd;
    &:hover {
      color: #fff;
    }
  }
  &:hover {
    background-color: #000;
  }
}
</style>
