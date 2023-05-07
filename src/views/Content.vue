<template>
  <div>
    <iframe id="react" name="react" src="http://localhost:3000/" title="iframe" width="400" height="400"></iframe>
    <div @click="handleClcik">点击我给iframe传值</div>
 </div>
</template>

<script>
export default {
  name: 'ContentView',
  mounted () {
    window.addEventListener('message', (val) => {
      console.log('ifarme传递过来的值', val)
    })
  },
  methods: {
    handleClcik () {
      const ifarme = document.querySelector('#react')
      ifarme.contentWindow.postMessage({ age: 19 })
    }
  }
}
</script>
