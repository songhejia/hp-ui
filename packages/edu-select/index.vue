<template>
  <div class="hp-edu-select">
    <el-select v-model="model"
               placeholder="请选择"
               size="mini"
               @change="change"
               :disabled="disabled">
      <el-option v-for="item in education"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import educationData from '../../local/education.json'
import create from '../utils/create'
export default create({
  name: 'edu-select',
  data() {
    return {
      education: [],
      selfModel: ''
    }
  },
  props: {
    value: String,
    disabled: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    model: {
      get() {
        this.selfModel = this.value
        return this.selfModel
      },
      set(val) {
        this.$emit('input', val)
        this.selfModel = val
      }
    }
  },
  methods: {
    loadData() {
      this.education = _.orderBy(_.map(educationData, item => ({ value: item[0], label: item[1], parent: item[2], order: item[3], option: [] })), ['order'], ['asc'])
    },
    change(value) {
      const label = _.find(this.education, { value: value }).label
      this.$emit('change', value, label)
    }
  },
  mounted() {
    this.loadData()
  }
})
</script>
