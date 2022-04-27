<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'

export default {
  name: 'Detail',
  data() {
    return {
      goodsItemId: null,
    }
  },
  components: {
    DetailNavBar,
  },
  created() {
    this.goodsItemId = this.$route.params.goodsItemId
  },
}
</script>

<style scoped>
</style>
