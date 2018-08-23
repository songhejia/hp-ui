<template>
  <div class="hp-industry-dialog">
    <checkbox-dialog :data="groups"
                     :label="label"
                     :title="title"
                     v-model="model"
                     @confirmClick="confirmClick"
                     :dialog-id="dialogId||'industry'"
                     :limit="limit"
                     :column="column"></checkbox-dialog>
  </div>
</template>
<script>
import industryJson from '../../local/industry_relation.json'
import create from '../utils/create'
import CheckboxDialog from '../checkbox-dialog'
const config = {
  name: 'industry-dialog',
  data() {
    return {
      industryData: industryJson,
      groups: [],
      selfModel: ''
    }
  },
  components: {
    CheckboxDialog
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
  props: {
    value: Array,
    label: String,
    title: String,
    column: {
      type: Number,
      default: 2
    },
    dialogId: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  methods: {
    loadData() {
      const data = _.map(this.industryData, item => ({ value: item[0], label: item[1], parent: item[2], order: item[3], option: [] }))
      const groups = []
      groups.push({
        label: '',
        option: data,
        hasChildren: false
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
}

export default create(config)
</script>

