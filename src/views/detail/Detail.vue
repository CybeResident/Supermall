<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper
        :top-images="topImages"
        @image-load="imageLoad"
      ></detail-swiper>
      <!-- @detail-swiper-load="detailSwiperLoad" -->
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @image-load="imageLoad"
      ></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import {
  getDetail,
  Goods,
  GoodsParam,
  Shop,
  getRecommend,
} from 'network/detail.js'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'

export default {
  name: 'Detail',
  data() {
    return {
      // 储存商品id
      iid: '',
      // 储存顶部轮播图数据
      topImages: [],
      // 储存商品数据
      goods: {},
      // 储存店铺数据
      shop: {},
      // 储存商品的详情数据
      detailInfo: {},
      // 储存商品参数信息
      paramInfo: {},
      // 储存商品评论
      commentInfo: {},
      // 储存推荐信息
      recommends: [],
    }
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
  },
  mixins: [itemListenerMixin],

  components: {
    Scroll,
    GoodsList,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
  },
  created() {
    // 1. 保存传入的id
    this.iid = this.$route.params.iid

    // 2. 根据 iid 请求详情页数据
    getDetail(this.iid).then((res) => {
      // console.log(res)
      const data = res.result

      // 2.1 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // 2.2 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 2.3 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 2.4 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 2.5 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 2.6 获取商品评论
      // 判断，当存在商品评论时，进行获取
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3. 请求推荐信息
    getRecommend().then((res) => {
      console.log(res)
      this.recommends = res.data.list
    })
  },
  mounted() {},
  destroyed() {
    this.$bus.$off('item-img-load', this.itemImgListener)
  },
}
</script>

<style scoped>
#detail {
  height: calc(100vh - 54px);
}
.detail-nav {
  position: relative;
  z-index: 3;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 44px);
}
</style>
