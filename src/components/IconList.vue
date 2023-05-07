<template>
  <div>
    <!-- <svg width="100%" height="100%">
      <defs>
        <g id="Port">
          <circle style="fill:inherit" r="10"/>
        </g>
      </defs>
      <use x="50" y="10" xlink:href="#Port" class="classA"></use>
    </svg> -->
    <div v-for="(item, index) in svgIcons" :key="index">
      {{generateIconCode(item)}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvgIcon',
  data () {
    return {
      svgIcons: []
    }
  },
  methods: {
    generateIconCode (symbol) {
      return `<svg-icon icon-class="${symbol}">`
    }
  }
}
</script>
