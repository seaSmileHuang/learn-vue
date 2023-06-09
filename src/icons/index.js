// import Vue from 'vue'
// import SvgIcon from '@/components/SvgIcon.vue'
// const requireContext = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// console.log('hhh')
// Vue.component('svg-icon', SvgIcon)

// requireAll(requireContext)

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
