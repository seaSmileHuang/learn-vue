import Clipboard from './clipboard'
import Vue from 'vue'
const install = function (Vue) {
  Vue.directive('Clipboard', Clipboard)
}

Vue.use(install)

export default {
  install
}
