<template>
  <div class="hp-salary-scope">
    <el-select v-model="model"
               placeholder="请选择"
               size="mini"
               @change="change">
      <el-option v-for="item in salaryRange"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import salaryRangeData from '../../local/salary_range.json'
import create from '../utils/create'
export default create({
  name: 'salary-scope',
  data() {
    return {
      salaryRange: [],
      selfModel: ''
    }
  },
  props: {
    value: String
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
      _.remove(salaryRangeData, (value) => value[0] === "0000000000")
      this.salaryRange = _.map(salaryRangeData, item => ({ value: item[0], label: item[1], parent: item[2], order: item[3], option: [] }))
    },
    change(value) {
      const label = _.find(this.salaryRange, { value: value }).label
      this.$emit('change', value, label)
    }
  },
  mounted() {
    this.loadData()
  }
})
</script>
