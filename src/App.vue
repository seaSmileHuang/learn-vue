<template>
  <div id="app" class="app">
    和客户
    <nav>
      <router-link to="/good">Good</router-link> |
      <router-link  to="/about?a=1">About</router-link>
      <router-link  to="/about?b=2">About2</router-link>
      <router-link to="/content">content</router-link>
      <router-link to="/good" v-slot="{href, route, navigate, isActive, isExactActive}">
        <li :class="[isExactActive && 'router-link-active']">
          <a :href="href" @click="navigate">{{route.fullPath}}</a>
        </li>
      </router-link>
      <div id="app-react">react-app</div>
      <tree-select v-model="value" :data="data" :filterable="true" :lazy="true" :loadNode="loadNode" :multiple="true"></tree-select>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import actions from '@/utils/actions'
import axios from 'axios'
import TreeSelect from '@/components/TreeSelect'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    TreeSelect
  },
  data () {
    return {
      fatherData: null,
      data: [
        {
          id: 1,
          label: '我是label1'
        },
        {
          id: 2,
          label: '我是label2',
          children: [
            {
              id: 22,
              label: '我是label22'
            }
          ]
        },
        {
          id: 3,
          label: '我是label3'
        }
      ].concat([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => ({
        id: item,
        label: '我是label' + item
      }))),
      value: '3'
    }
  },
  computed: {
    ...mapState('app', ['name'])
  },
  mounted () {
    console.log('hhj已经渲染app', this.name)
    // const ws = new WebSocket('ws://localhost:8081/')
    // ws.onopen = function () {
    //   ws.send('hello websocker')
    // }

    // ws.onmessage = function (message) {
    //   console.log('客户端接受到消息了', message)
    //   ws.close()
    // }

    // ws.onclose = function () {
    //   console.log('connection closed')
    // }
    // ws.onerror = function (err) {
    //   console.log('error', err)
    // }
    const ele = document.getElementById('app')
    console.log('ele', ele.offsetHeight, ele.style)
    // const style = window.getComputedStyle(ele)
    // console.log('style', style)
  },
  provide () {
    return {
      fatherData: () => this.fatherData
    }
  },
  methods: {
    handleClick () {
      console.log('hhhj')
      this.increment({ name: '这是修改后的' })
    },
    loadNode (node, resolve) {
      resolve([
        {
          id: 30,
          label: '我是label30'
        },
        {
          id: 32,
          label: '我是label32'
        }
      ])
    },
    ...mapActions('app', ['increment'])
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.app {
  background-color: blue;
  .larget-text()
}
.larget-text() {
  font-size: 1em;
}

</style>
