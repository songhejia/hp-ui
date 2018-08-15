<template>
  <div class="checkbox-item-group">
    <el-checkbox-group v-model="checkList"
                       :max="limit"
                       @change="handleChange">
      <template v-for="(group,index) in data">
        <div class="hp-item"
             @click="validateLimit"
             :style="{'width':checkboxItemWidth}">
          <checkbox-item :label="group.strKey"
                         :text="group.value"
                         :is-expand="group.strKey===activeStrKey"
                         :has-sub-item="(!!group.children&&!!group.children.length)"
                         @subItemToggle="subItemToggle"></checkbox-item>
        </div>
        <template v-if="(index+1)%column===0||(index+1)===data.length">
          <div class="hp-sub-item-group"
               v-for="seq in index%column+1"
               :class="{'is-expand':data[index-seq+1].strKey===activeStrKey}">
            <div class="arrow-up"
                 :style="{'left':arrowUpLeft(seq)}">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="hp-item"
                 v-if="data[index-seq+1]&&data[index-seq+1].children"
                 v-for="child in data[index-seq+1].children"
                 @click="validateLimit"
                 :style="{'width':checkboxItemWidth}">
              <checkbox-item :label="child.strKey"
                             :text="child.value"
                             :has-sub-item="false"
                             :disabled="checkList.indexOf(data[index-seq+1].strKey)>=0"></checkbox-item>
            </div>
          </div>
        </template>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script>
import create from '../utils/create'
import CheckboxItem from '../checkbox-item'
export default create({
  name: 'checkbox-item-group',
  data() {
    return {
      activeStrKey: '',
      checkList: this.value
    }
  },
  components: {
    CheckboxItem
  },
  props: {
    value: Array,
    limit: {
      type: Number,
      default: 3
    },
    data: Array,
    column: {
      type: Number,
      default: 3
    }
  },
  computed: {
    checkboxItemWidth() {
      return `${100 / this.column}%`
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.checkList)
    },
    validateLimit() {
      const cnt = this.checkList.length
      this.$nextTick(_ => {
        if (this.checkList.length >= this.limit && cnt === this.checkList.length) {
          this.$message({
            message: `最多只能选择${this.limit}条`,
            type: 'warning'
          });
        }
      })
    },
    subItemToggle(param) {
      this.activeStrKey = param.label === this.activeStrKey ? "-1" : param.label
      /* eslint-disable no-alert, no-console */
    },
    arrowUpLeft(seq) {
      return `${100 / 2 / this.column * (seq * 2 - 1)}%`
    }
  }
})
</script>
<style lang="scss">
.checkbox-item-group {
  .hp-item {
    display: inline-block;
  }
  .hp-sub-item-group {
    background-color: #eef1f6;
    margin: 5px 0;
    display: none;
    border: 1px solid #d8dce6;
    box-sizing: border-box;
    position: relative;
    .arrow-up {
      position: absolute;
      top: -15px;
      font-size: 20px;
      color: #eef1f6;
      left: 7%;
    }
  }
  .is-expand {
    display: block;
  }
}
</style>
