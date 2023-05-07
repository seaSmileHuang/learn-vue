<template>
  <div class="about">
    <h1 @click="changeName">This is an about page</h1>
    12{{$store.state.app.name}}
    123{{getName}}

    <div @click.prevent="handleParent">
      <div @click.alt.exact="handleChild">点击我</div>
    </div>
    我是sum的值{{sum}}

    <!-- <table> -->
      <!-- <custom-input  @change.native="searchText = $event.target.value"></custom-input>
      searchText:{{searchText}} -->
      <custom-input-cmp v-model="searchText">
        <template v-slot:default="{name}">
          拆超{{name}}
        </template>
      </custom-input-cmp>
      <!-- {{searchText}} -->
    <!-- </table> -->
    <!-- <router-link to="/about/test">点击跳转到test</router-link>
    <router-view></router-view> -->
    <time-link :options="selections"></time-link>
    <real-time-preview @on-change="sum += $event" ></real-time-preview>
    <svg-icon iconClass="chart"></svg-icon>
    <div @click="goBack">点击我回退</div>
    <!-- <fast-picker-tool-bar :orders="" :events="" ></fast-picker-tool-bar> -->
    <router-view/>
  </div>
</template>

<script>
import RealTimePreview from '../components/RealTimePreview.vue'
import SvgIcon from '../components/SvgIcon.vue'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import CustomInput from '../components/CustomInput.vue'
import CustomInputCmp from '../components/CustomInputCmp.vue'
import TimeLink from '../components/TimeLink/index.vue'
import dayjs from 'dayjs'
import { FastSelections } from '../components/TimeLink/dateValue'
import FastPickerToolBar from '../components/TimeLink/FastPickerToolBar.vue'
import actions from '@/utils/actions'

export default {
  name: 'AboutView',
  // eslint-disable-next-line vue/no-unused-components
  components: { RealTimePreview, SvgIcon, CustomInput, CustomInputCmp, TimeLink, FastPickerToolBar },
  data () {
    return {
      checked: [],
      selected: [],
      age: { name: ' hhj' },
      sum: 1,
      searchText: '',
      selections: [
        FastSelections.TODAY,
        FastSelections.YESTERADAY,
        FastSelections.RECENT_7_DAYS_OFFSET,
        FastSelections.RECENT_30_DAYS,

        // 自定义
        [dayjs(), -9, '今天往后10天'],
        [dayjs(), 9, '今天往前10天'],
        [dayjs('2020-4-5'), 9, '发布后10天'],
        [dayjs('2019-9-15'), 0, '去年9月15号']
      ]
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.age.name = 'hhj修改后的'
    // }, 1000)
    // actions.onGlobalStateChange((state, prev) => {
    //   console.log('微应用观察者', state, prev)
    // }, true)
  },
  inject: ['fatherData'],
  provide () {
    return {
      getAge: () => this.age
    }
  },
  computed: {
    ...mapGetters('app', ['getName']),
    ...mapState(['']),
    getFatherData () {
      return this.fatherData()
    }
  },
  watch: {
    $route (to, from) {
      console.log('to', to)
    },
    getFatherData (val) {
      console.log('getFatherData改变了', val)
    }
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    const confirm = window.confirm('hhhh')
    if (confirm) {
      next()
    } else {
      next(false)
    }
  },
  methods: {
    ...mapActions('app', {
      add: 'increment'
    }),
    ...mapMutations('app', {
      setNum: 'setNum'
    }),
    changeName () {
      // this.add()
      // this.$store.commit('app/setNum', 'hkl')
      console.log('hh', this.getName)
      this.setNum('kkk')
      console.log('hh', this.getName)
    },
    handleParent () {
      console.log('父亲')
    },
    handleChild () {
      console.log('hh')
    },
    async goBack () {
      actions.setGlobalState({
        name: 'good',
        msg: 'hh'
      })
      // console.log('route', this.$route.params)

      // window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      // this.$router.push({
      //   path: '/about/test/3'
      // }).then(() => {
      //   console.log('跳转成功呢')
      // })
      // const res = await this.add({ name: 'hps' })
      // console.log('res', res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
