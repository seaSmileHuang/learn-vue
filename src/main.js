import Vue from 'vue'
// import { registerMicroApps, start } from 'qiankun'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/directive'
import '@/icons'
import './permission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$eventbus = new Vue()
Vue.prototype.name = 'jhh'
// let router = null
let instance = null

async function render (props = {}) {
  const { container } = props

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap (strap) {
  console.log('[vue] vue app bootstraped', strap)
  if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line camelcase, no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  }
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  // actions.setActions(props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  // router = null
}

// registerMicroApps([
//   {
//     name: 'react app',
//     entry: 'http://localhost:3000/',
//     container: '#app-react',
//     activeRule: '/app-react'
//   }
// ])
// start()
