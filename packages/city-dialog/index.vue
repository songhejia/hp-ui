<template>
  <div class="hp-city-dialog">
    <checkbox-dialog :data="groups"
                     :label="label"
                     :title="title"
                     v-model="model"
                     @confirmClick="confirmClick"></checkbox-dialog>
  </div>
</template>
<script>
import hotCityJson from '../../local/hot.city.json'
import allCityJson from '../../local/all.city.json'
import create from '../utils/create'
import CheckboxDialog from '../checkbox-dialog'
export default create({
  name: 'city-dialog',
  data() {
    return {
      hotCityData: hotCityJson.data,
      allCityData: allCityJson.data,
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
      default: 6
    }
  },
  methods: {
    loadData() {
      const allCitys = _.map(this.allCityData, item => ({ order: item.order, label: item.value, value: item.strKey, parent: item.parentStrKey, option: [] }))
      const hotCitys = _.map(this.hotCityData, item => ({ order: item.order, label: item.value, value: item.strKey, parent: item.parentStrKey, option: [] }))

      _.each(hotCitys, item => {
        let subItem = _.filter(allCitys, { 'parent': item.value })
        item.option = subItem
        item.hasChildren = !!subItem.length
      })

      const provinces = _.reject(_.filter(allCitys, { 'parent': '489' }), item => _.find(hotCitys, { 'value': item.value }))
      _.each(provinces, item => {
        let subItem = _.filter(allCitys, { 'parent': item.value })
        item.option = subItem
        item.hasChildren = !!subItem.length
        if (item.hasChildren) {
          _.each(item.option, o => {
            let sub = _.filter(allCitys, { 'parent': o.value })
            o.option = sub
            o.hasChildren = !!sub.length
          })
        }
      })
      const groups = []
      groups.push({
        label: '热门城市',
        option: hotCitys,
        hasChildren: true
      })
      groups.push({
        label: '省市',
        option: provinces,
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
