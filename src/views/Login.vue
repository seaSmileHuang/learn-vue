<template>
  <div>
    我是登录页面
    <button @click="handleLogin">点击登录</button>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    async handleLogin () {
      try {
        debugger
        await this.$store.dispatch('user/login', { userName: 'hhj', password: '123456' })
        const redirectPath = this.$route.query.redirect
        console.log('redirectPath', redirectPath)
        this.$router.push({ path: redirectPath || '/' }) // 用户信息
      } catch (err) {
        console.log('err')
      }
    }
  }
}
</script>
