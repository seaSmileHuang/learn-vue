<template>
  <ul @click="handleClickEvent">
    <li v-for="(order, index) in orders" :key="index">
      {{ order}}
    </li>
    <li>时间段</li>
  </ul>
</template>

<script>
import { FixedValueEntities, FastSelections } from './dateValue'
export const Order = {
  thisWeek: '本周',
  thisYear: '全年',
  thisMonth: '本月',
  Clear: '汇总'
}

const isSameDate = (a, b) => {
  if (a && b) {
    return a.isSame(b, 'day')
  }
  // a and b is null
  return a === b
}

const SameValues = {
  [Order.thisWeek]: (v) => {
    if (v) {
      return v.every((eventValue, i) =>
        isSameDate(eventValue, FixedValueEntities[FastSelections.thisWeek][i])
      )
    }
    return false
  },
  [Order.thisMonth]: (v) => {
    if (v) {
      return v.every((eventValue, i) =>
        isSameDate(eventValue, FixedValueEntities[FastSelections.thisMonth][i])
      )
    }
    return false
  },
  [Order.thisYear]: (v) => {
    if (v) {
      return v.every((eventValue, i) =>
        isSameDate(eventValue, FixedValueEntities[FastSelections.thisYear][i])
      )
    }
    return false
  },
  [Order.Clear]: (v) => {
    if (v) {
      return v.every(eventValue => isSameDate(eventValue, null))
    }
    return true
  }
}

export default {
  name: 'FastPickerToolBar',
  props: {
    orders: {
      type: Array
    },
    events: {
      type: Array
    },
    currentDates: {
      type: Array
    }
  },
  methods: {
    handleClickEvent (e) {
      console.log('e', e)
    }
  }
}
</script>
