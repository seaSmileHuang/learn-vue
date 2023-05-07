import { debounce } from '@/utils'

export default {
  mounted () {
    window.addEventListener('resize', this.onResize())
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize())
  },
  methods: {
    onResize () {
      return debounce(() => {
        // eslint-disable-next-line no-undef
        console.log('myChart', this.myChart)
        this.myChart && this.myChart.resize()
      }, 100)
    }
  }
}
