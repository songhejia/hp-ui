<template>
  <div class="checkbox-item-group">
    <el-checkbox-group v-model="checkList"
                       :max="limit"
                       @change="handleChange">
      <template v-for="(group,index) in groups">
        <div class="hp-item"
             @click="validateLimit"
             :style="{'width':checkboxItemWidth}">
          <checkbox-item :label="group.strKey"
                         :text="group.value"
                         :is-expand="group.strKey===activeStrKey"
                         :has-sub-item="(!!group.children&&!!group.children.length)"
                         @subItemToggle="subItemToggle"></checkbox-item>
        </div>
        <template v-if="(index+1)%column===0||(index+1)===groups.length">
          <div class="hp-sub-item-group"
               v-for="seq in column"
               :class="{'is-expand':groups[index-seq+1].strKey===activeStrKey}">
            <div class="arrow-up"
                 :style="{'left':arrowUpLeft(seq)}">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="hp-item"
                 v-if="groups[index-seq+1]&&groups[index-seq+1].children"
                 v-for="child in groups[index-seq+1].children"
                 @click="validateLimit"
                 :style="{'width':checkboxItemWidth}">
              <checkbox-item :label="child.strKey"
                             :text="child.value"
                             :has-sub-item="false"
                             :disabled="checkList.indexOf(groups[index-seq+1].strKey)>=0"></checkbox-item>
            </div>
          </div>
        </template>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script>
import create from '../utils/create'
export default create({
  name: 'checkbox-item-group'
})
</script>
