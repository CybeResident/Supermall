<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      ref="nav"
      @nav-bar-click="navBarClick"
    ></detail-nav-bar>
    <scroll
      class="detail-content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
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
      <detail-param-info
        :param-info="paramInfo"
        ref="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="commentInfo"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @add-cart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import {
  getDetail,
  Goods,
  GoodsParam,
  Shop,
  getRecommend,
} from 'network/detail.js'
import { itemListenerMixin, backTopMixin } from 'common/mixin'

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
      // 储存导航栏选项的距离顶部的Y值（Y坐标）
      themeTopYs: [],
      // 储存滚动内容的当前所处区域的index值
      currentIndex: 0,

      toastMsg: '',
      isToastShow: false,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },
    navBarClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0)
    },
    contentScroll(position) {
      // 1. 滚动内容时，导航栏选项的样式发生变化
      if (-position.y < this.themeTopYs[1]) {
        this.$refs.nav.currentIndex = 0
      } else if (-position.y < this.themeTopYs[2]) {
        this.$refs.nav.currentIndex = 1
      } else if (-position.y < this.themeTopYs[3]) {
        this.$refs.nav.currentIndex = 2
      } else {
        this.$refs.nav.currentIndex = 3
      }

      // 2. 是否显示 回到顶部 按钮
      this.listenShowBackTop(position)
    },
    addToCart() {
      // 1. 获取购物车里需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2. 将商品添加到购物车里
      this.addCart(product).then((res) => {
        this.$toast.show(res)
      })
    },
  },
  mixins: [itemListenerMixin, backTopMixin],

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
    DetailBottomBar,
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
      // console.log(res)
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
  position: relative;
  z-index: 9;
  background-color: #fff;
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
