<template>
  <div >
    Good
    <button id="btn" v-Clipboard:copy="inputValue">点击我</button>
  </div>
</template>

<script>
export default {
  name: 'GoodView',
  data () {
    return {
      inputValue: 'hhj'
    }
  },
  mounted () {
    setTimeout(() => {
      this.inputValue = 'hps'
    }, 2000)
  }
}
</script>
