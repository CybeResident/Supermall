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
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        // eventPassthrough: 'horizontal',
        // mouseWheel: true,
        // disableMouse: false,
        // disableTouch: false,
      })
      console.log(this.scroll)
    })
  },
  components: {},
}
</script>

<style scoped>
</style>
