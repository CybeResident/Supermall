<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="" @load="detailSwiperLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'

export default {
  name: 'DetailSwiper',
  data() {
    return {
      isSwiperLoad: false,
    }
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      },
    },
  },

  methods: {
    // 判断，当有一张轮播图片加载完成时，发送一次事件即可
    detailSwiperLoad() {
      if (!this.isSwiperLoad) {
        this.$emit('image-load')
        this.isSwiperLoad = true
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  width: 100%;
}
</style>
