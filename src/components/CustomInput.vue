<template>
  <div>
    <div>
    <input type="input" v-model="messages">
    {{value}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  data () {
    return {
      value: ''
    }
  },
  computed: {
    message: {
      get () {
        return this.value
      },
      set (val) {
        this.value = val
      }
    }
  }
}
</script>
