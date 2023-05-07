import dayjs from 'dayjs'
import ISOWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(ISOWeek)

// 昨天
export const yesterday = [
  dayjs().subtract(1, 'day'),
  dayjs().subtract(1, 'day')
]
// 今周
export const weekValue = [
  dayjs().startOf('isoWeek'),
  dayjs().endOf('isoWeek')
]
// 这月
export const monthValue = [
  dayjs().startOf('month'),
  dayjs().endOf('month')
]
// 今年
export const yearValue = [
  dayjs().startOf('year'),
  dayjs().endOf('year')
]

export const getRangeFromUnit = (unit) => {
  const [day, offset] = unit
  if (offset < 0) {
    return [dayjs(day).subtract(Math.abs(offset), 'day'), dayjs(day)]
  } else {
    return [dayjs(day), dayjs(day).add(offset, 'day')]
  }
}

export const FastSelections = {
  TODAY: '今天',
  YESTERADAY: '昨天',

  // 不包含今天的最近N天
  // 需要在加上_$$后缀消除和歧义
  RECENT_7_DAYS_OFFSET: '最近7天_$$',
  RECENT_30_DAYS_OFFSET: '最近30天_$$',

  // 包含今天的最近N天
  RECENT_7_DAYS: '最近7天',
  RECENT_30_DAYS: '最近30天',

  thisWeek: '本周',
  thisYear: '全年',
  thisMonth: '本月',
  Clear: '汇总'
}

export const FixedValueGetterMap = {
  [FastSelections.thisWeek]: () =>
    [dayjs().startOf('isoWeek'), dayjs().endOf('isoWeek')],
  [FastSelections.thisYear]: () =>
    [dayjs().startOf('year'), dayjs().endOf('year')],
  [FastSelections.thisMonth]: () =>
    [dayjs().startOf('month'), dayjs().endOf('month')],
  [FastSelections.TODAY]: () => getRangeFromUnit([dayjs(), 0]),
  [FastSelections.YESTERADAY]: () =>
    getRangeFromUnit([dayjs().subtract(1, 'day'), 0]),

  [FastSelections.RECENT_7_DAYS_OFFSET]: () =>
    getRangeFromUnit([dayjs().subtract(1, 'day'), -6]),
  [FastSelections.RECENT_30_DAYS_OFFSET]: () =>
    getRangeFromUnit([dayjs().subtract(1, 'day'), -29]),

  [FastSelections.RECENT_7_DAYS]: () => getRangeFromUnit([dayjs(), -6]),
  [FastSelections.RECENT_30_DAYS]: () => getRangeFromUnit([dayjs(), -29]),
  [FastSelections.Clear]: () => [null, null]
}

export const FixedValueEntities = new Proxy({}, {
  get (target, propKey) {
    if (
      typeof propKey !== 'string' ||
      !Object.keys(FixedValueGetterMap).includes(propKey)
    ) {
      return Reflect.get(target, propKey)
    }
    const value = FixedValueGetterMap[propKey]()

    return value
  }
})

export const useFastPicker = () => {
  const ref = {}

  const thisWeek = () => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    ref.current.change(FixedValueEntities[FastSelections.thisWeek])
  }
  const thisMonth = () => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    ref.current.change(FixedValueEntities[FastSelections.thisMonth])
  }
  const thisYear = () => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    ref.current.change(FixedValueEntities[FastSelections.thisYear])
  }
  const clear = () => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    ref.current.change(null)
  }
  const recentSevenDays = () => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    const unit = [dayjs(), -6]
    ref.current.change(getRangeFromUnit(unit))
  }
  const recentThirtyDays = (() => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    ref.current.change(getRangeFromUnit([dayjs(), -29]))
  }, [])

  const change = (v) => {
    if (!ref.current) {
      throw Error('The `FastPickerInstance` should attach the <FaskPicker/>')
    }
    ref.current.change(v)
  }
  return [
    () => ({
      clear,
      thisYear,
      thisWeek,
      thisMonth,
      recentSevenDays,
      recentThirtyDays,
      change,
      // This ref object only use in the FastRangePicker internal
      __DO_NOT_USE_INTERNAL_REF_OBJECT__: ref
    })
  ]
}
