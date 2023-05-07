<template>
  <div>
   <el-select :value="value" @change="onchange">
    <el-option v-for="(item, index) in selectionsList" :key="index" :label="item.name" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import is from '../../utils/is'
import { getRangeFromUnit, FixedValueEntities } from './dateValue'
const hashfy = (selections) => {
  if (is.arr(selections)) {
    const [dayRoot, number, name] = selections
    return `_$$_${dayRoot.format()}_$$_${number}${name ? `_$$_${name}` : ''}`
  }
  return selections
}

const isSameRange = (rangeA, rangeB) => {
  if (rangeA && rangeB) {
    return rangeA.every((v, i) => isSameDate(v, rangeB[i]))
  }
  return false
}

const isSameDate = (a, b) => {
  if (a && b) {
    return a.isSame(b, 'day')
  }
  // a and b is null
  return a === b
}

export default {
  name: 'FastPickerSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    currentDates: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    selectionsList () {
      return this.options.map(selectionOrUnit => {
        if (is.arr(selectionOrUnit)) {
          const unit = selectionOrUnit
          const v = hashfy(unit)
          return {
            value: v,
            name:
              selectionOrUnit[2] ??
              `${selectionOrUnit[0].format()}_${selectionOrUnit[1]}`
            // action: () => {
            //   instance.change(getRangeFromUnit(selectionOrUnit))
            // },
            // isActive: v === value
          }
        } else {
          return {
            value: selectionOrUnit,
            name: selectionOrUnit.replace(/_\$\$/, '')
            // action: () => {
            //   instance.change(FixedValueEntities[selectionOrUnit])
            // },
            // isActive: value === selectionOrUnit
          }
        }
      })
    }
  },
  watch: {
    currentDates: {
      immediate: true,
      handler (currentDates, prevDates) {
        if (currentDates) {
          const selection = this.options.find(selectionOrUnit => {
            if (is.str(selectionOrUnit)) {
              return isSameRange(
                FixedValueEntities[selectionOrUnit],
                currentDates
              )
            } else {
              return isSameRange(getRangeFromUnit(selectionOrUnit), currentDates)
            }
          })
          if (selection) {
            this.value = is.str(selection) ? selection : hashfy(selection)
          }
        } else {
          this.value = undefined
        }
      }
    }
  },
  methods: {
    onchange (value) {
      this.selectedValue = value
      for (const selectionOrUnit of this.options) {
        if (is.str(selectionOrUnit) && value === selectionOrUnit) {
          this.$emit('change', FixedValueEntities[selectionOrUnit])
          return
        } else if (
          is.arr(selectionOrUnit) &&
          hashfy(selectionOrUnit) === value
        ) {
          this.$emit('change', getRangeFromUnit(selectionOrUnit))
          return
        }
      }
    }
  }
}
</script>
