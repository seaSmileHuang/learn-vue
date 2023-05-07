<template>
  <div>
    <button @click="handleLogout">退出登录</button>
    <div>我是layout</div>
  <router-view/>
  </div>

</template>

<script>
export default {
  name: 'LayoutView',
  methods: {
    async handleLogout () {
      console.log('退出登录')
      await this.$store.dispatch('user/logout')
      this.$router.replace('/login')
    }
  }
}
</script>
