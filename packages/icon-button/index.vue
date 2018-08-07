<template>
  <div class="hp-icon-button"
       @click="handleClick">
    <el-tooltip class="item"
                effect="dark"
                :content="toolTip"
                placement="bottom"
                :disabled="!toolTip"
                :effect="effect">
      <span>
        <i class="fa"
           :class="iconClass"></i>
      </span>
    </el-tooltip>
  </div>

</template>
<script>
import create from '../utils/create'
export default create({
  name: 'hp-icon-button',
  props: {
    name: String,
    toolTip: String,
    effect: {
      type: String,
      default: 'dark'
    }
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
$height: 39px;
.hp-icon-button {
  display: inline-block;
  width: $height;
  text-align: center;
  margin: 0 5px;
  cursor: pointer;
  span {
    display: inline-block;
    height: 39px;
    width: 100%;
    i {
      color: #adb2bd;
      width: 100%;
      display: inline-block;
      &:hover {
        color: #fff;
      }
    }
  }
  &:hover {
    background-color: #000;
  }
}
</style>
