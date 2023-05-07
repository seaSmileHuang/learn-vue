<template>
  <div>
    <div @click="$emit('on-change', 3)">我是about page</div>
    <chart-base width="100%" height="100%" :options="options"></chart-base>
    <div>我是注入的{{age.name}}</div>
  </div>
</template>

<script>
import ChartBase from './ChartBase.vue'
import china from '@/assets/china.json'
import echarts from 'echarts'

const COlORS = [
  '#35D97A',
  '#11888C',
  '#3B91FF',
  '#7E5FFF',
  '#D052B9',
  '#FFB83C',
  '#FF6B00',
  '#FF5845'
]
export default {
  name: 'RealTimePreview',
  components: { ChartBase },
  data () {
    return {
      options: {
        geo: {
          nameMap: {
            China: '中国'
          },
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          // 当前视角的缩放比例
          zoom: 2.15, // 2.3
          left: -300,
          top: 250,
          // scale 地图的长宽比
          aspectScale: 1,
          itemStyle: {
            normal: {
              borderColor: '#21EAFD', // 区域边框颜色
              areaColor: 'rgba(255,255,255,0)', // 区域颜色
              borderWidth: 1, // 区域边框宽度
              shadowBlur: 5,
              shadowColor: 'rgba(107,91,237,.7)'
            },
            emphasis: {
              borderColor: '#FFD1A3',
              areaColor: 'rgba(102,105,240,.3)',
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: 'rgba(135,138,255,.5)'
            }
          }
        },
        series: [
          {
            type: 'map', // 地图类型

            // 地图区域的多边形 图形样式
            itemStyle: {
              normal: {
                borderColor: '#2ab8ff',
                borderWidth: 1.5,
                areaColor: '#12235c'
              },
              emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0
              }
            },
            zoom: 1.2, // 当前视角的缩放比例
            // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            roam: false,
            map: 'china' // 使用中国地图
          }
        ]
      }
    }
  },
  inject: ['getAge'],
  computed: {
    age () {
      return this.getAge()
    }
  }
}
</script>
