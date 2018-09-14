<template>
  <div class="hp-job-type-dialog">
    <checkbox-dialog :data="groups"
                     :label="label"
                     :title="title"
                     :column='3'
                     v-model="model"
                     @confirmClick="confirmClick"
                     :dialog-id="dialogId||'job-type'"
                     :limit="limit"
                     :placeholder="placeholder"></checkbox-dialog>
  </div>
</template>
<script>
import jobTypeJson from '../../local/job_type_relation.json'
import create from '../utils/create'
import CheckboxDialog from '../checkbox-dialog'
export default create({
  name: 'job-type-dialog',
  data() {
    return {
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
    },
    dialogId: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 3
    },
    placeholder: {
      type: String,
      default: '请选择'
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
      const jobs = _.map(jobTypeJson, item => ({ value: item[0], label: item[1], parent: item[2], order: item[3], option: [] }))
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