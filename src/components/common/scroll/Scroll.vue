<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: true,
      click: true,
      probeType: this.probeType,
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
  },
  updated() {
    this.scroll.refresh()
  },
  components: {},
}
</script>

<style scoped>
</style>
