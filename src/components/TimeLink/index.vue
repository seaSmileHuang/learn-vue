<template>
  <div class="custom-time-link">
    <fast-picker-select :currentDates="dates" :options="options" @change="onPickerChange"></fast-picker-select>
    <fast-range-picker v-model="dates"></fast-range-picker>
  </div>
</template>

<script>
import FastPickerSelect from './FastPickerSelect.vue'
import FastRangePicker from './FastRangePicker.vue'
import { FixedValueEntities, FastSelections } from './dateValue'
export default {
  name: 'TimeLink',
  components: { FastPickerSelect, FastRangePicker },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dates: FixedValueEntities[FastSelections.TODAY]
    }
  },
  methods: {
    onchange (dates) {
      console.log('dates', dates)
      this.dates = dates
    },
    onPickerChange (dates) {
      console.log('onPickerChange', dates)
      this.dates = dates
    }
  }
}
</script>

<style scoped lang="less">
.custom-time-link {
  display: flex;
  align-items: center;
}
</style>
