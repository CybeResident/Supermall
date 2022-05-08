<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="回到顶部" />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style scoped>
.back-top {
  position: fixed;
  bottom: 64px;
  right: 10px;
}

.back-top img {
  width: 43px;
  object-fit: contain;
}
</style>
