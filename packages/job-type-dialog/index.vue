<template>
  <div class="hp-job-type-dialog">
    <checkbox-dialog :data="groups"
                     :label="label"
                     :title="title"
                     :column='3'
                     v-model="model"
                     @confirmClick="confirmClick"></checkbox-dialog>
  </div>
</template>
<script>
import json from '../../local/job.type.json'
import create from '../utils/create'
import CheckboxDialog from '../checkbox-dialog'
export default create({
  name: 'job-type-dialog',
  data() {
    return {
      data: json.data,
      groups: [],
      selfModel: ''
    }
  },
  components: {
    CheckboxDialog
  },
  props: {
    value: Array,
    label: String,
    title: String,
    column: {
      type: Number,
      default: 3
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
      const jobs = _.map(this.data, item => ({ order: item.order, label: item.value, value: item.strKey, parent: item.parentStrKey, option: [] }))
      _.each(jobs, item => {
        const subItems = _.filter(jobs, { 'parent': item.value })
        if (_.size(subItems)) {
          item.option = subItems
          item.hasChildren = true
        }
      })
      const groups = []
      groups.push({
        label: '',
        option: _.filter(jobs, { 'hasChildren': true }),
        hasChildren: true
      })
      this.groups = groups
    },
    confirmClick(confirmList) {
      this.$emit('confirmClick', confirmList)
    }
  },
  mounted() {
    /* eslint-disable no-alert, no-console */
    this.loadData()
  }
})
</script>