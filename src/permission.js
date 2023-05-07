// import router from '@/router'
// import store from '@/store'

// router.beforeEach(async (to, from, next) => {
//   console.log('permission被调用了')
//   if (['login', '403'].includes(to.name)) {
//     next()
//   } else {
//     //  store.getters.roles && store.getters.token
//     const hasLogin = store.getters.isAuth
//     if (hasLogin) {
//       if (store.getters.roles.includes(to.name)) {
//         // 有权限
//         next()
//       } else {
//         // 没有权限
//         next('/403')
//       }
//     } else {
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })

// router.afterEach(() => {
//   console.log('调用接受 ')
// })
