<template>
  <div class="test">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>我是test{{id}}</div>
  </div>
</template>

<script>
export default {
  name: 'TestView',
  props: ['id'],
  beforeDestroy () {

  },
  mounted () {
    console.log('params', this.$route, this.age)
  }
}
</script>
