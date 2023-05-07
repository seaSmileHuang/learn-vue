<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <chart-base width="100%" height="400px" :options="options"></chart-base>
  </div>
</template>

<script>
import ChartBase from '../components/ChartBase.vue'
const options = {
  color: [
    '#FF5845',
    '#FF6B00',
    '#FFB83C',
    '#F47B75',
    '#D052B9',
    '#7E5FFF',
    '#3087F6',
    '#1489BF',
    '#11888C',
    '#35D97A'
  ],
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      width: '80%',
      left: '10%',
      top: 60,
      bottom: 60,
      minSize: '100',
      maxSize: '50%',
      gap: -1,
      label: {
        show: true
      },
      data: [
        {
          name: '浏览器',
          value: 1
        },
        {
          name: '阅读量',
          value: 2
        }
      ]
    }
  ]
}
export default {
  name: 'HomeView',
  data () {
    return {
      options
    }
  },
  components: { ChartBase }

}
</script>
