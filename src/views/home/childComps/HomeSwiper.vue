<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isSwiperLoad: false,
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return {
          banners: [],
          // recommends: [],
        }
      },
    },
  },
  methods: {
    swiperImgLoad() {
      if (!this.isSwiperLoad) {
        this.$emit('swiper-img-load')
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
</style>