<template>
  <div ref='chartRef' :style="{width: width, height: height}">

  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import china from '@/assets/china.json'
console.log('chain', china)

export default {
  mixins: [resize],
  name: 'ChartBase',
  props: {
    width: String,
    height: String,
    isLoading: Boolean,
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.drawCharts()
  },
  beforeDestroy () {
    this.myChart && this.myChart.dispose()
  },
  watch: {
    options () {
      this.drawCharts()
    }
  },
  methods: {
    drawCharts () {
      if (this.options) {
        echarts.registerMap('china', china)

        this.myChart = echarts.init(this.$refs.chartRef)
        // this.myChart.clear()
        this.myChart.setOption(this.options)
      }
    }
  }

}
</script>
